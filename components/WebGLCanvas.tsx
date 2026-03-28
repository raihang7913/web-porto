
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Theme, SOCIAL_LINKS } from '../types';
import { backgroundVertex, backgroundFragment } from './Shaders';
import gsap from 'gsap';

interface WebGLCanvasProps {
  theme: Theme;
  onOrbHover: (name: string | null) => void;
  scrollProgress?: number;
  isScrolling?: boolean;
}

const WebGLCanvas: React.FC<WebGLCanvasProps> = ({ theme, onOrbHover }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const orbs = useRef<any[]>([]);
  const snowParticles = useRef<THREE.Points | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  const createIconTexture = (unicode: string, color: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, 256, 256);
    ctx.font = '900 140px "Font Awesome 6 Brands", "Font Awesome 6 Free"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(unicode, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: window.devicePixelRatio <= 1, 
      alpha: true, 
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    containerRef.current.appendChild(renderer.domElement);

    // 1. Background - Deep Anthracite Gradient
    const bgGeometry = new THREE.PlaneGeometry(2, 2);
    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader: backgroundVertex,
      fragmentShader: backgroundFragment,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(theme === 'dark' ? '#050505' : '#ffffff') },
        uColor2: { value: new THREE.Color(theme === 'dark' ? '#0f1115' : '#e0e0e5') }
      },
      depthWrite: false
    });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    scene.add(bgMesh);

    // Add lighting for enhanced 3D effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);
    
    const fillLight = new THREE.DirectionalLight(0x4a9eff, 0.3);
    fillLight.position.set(-5, -5, -5);
    scene.add(fillLight);

    // 2. Snow System - Minimal for best performance
    const snowCount = 150;
    const snowGeometry = new THREE.BufferGeometry();
    const snowPos = new Float32Array(snowCount * 3);
    const snowSpeeds = new Float32Array(snowCount);
    for (let i = 0; i < snowCount; i++) {
      snowPos[i * 3] = (Math.random() - 0.5) * 40;
      snowPos[i * 3 + 1] = Math.random() * 40 - 20;
      snowPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      snowSpeeds[i] = 0.01 + Math.random() * 0.04;
    }
    snowGeometry.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
    const snowMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.6 });
    const snow = new THREE.Points(snowGeometry, snowMat);
    snowParticles.current = snow;
    scene.add(snow);

    // 3. 3D Glass Orbs (Social Hub) - Enhanced 3D with smooth animation
    const orbGeom = new THREE.SphereGeometry(1, 32, 32);
    SOCIAL_LINKS.forEach((link, i) => {
      const orbColor = theme === 'dark' ? link.darkColor : link.lightColor;
      // Enhanced 3D glass material with better depth
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xffffff),
        transmission: 0.9,
        thickness: 1.5,
        roughness: 0.05,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.5,
        envMapIntensity: 1.2
      });

      const mesh = new THREE.Mesh(orbGeom, mat);
      
      // Add subtle glow effect
      const glowGeometry = new THREE.SphereGeometry(1.1, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(orbColor),
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      mesh.add(glowMesh);
      
      const texture = createIconTexture(link.unicode, orbColor);
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.4, 1.4, 1);
      mesh.add(sprite);

      // Strategic positioning: spread them out more and higher up
      const angle = (i / SOCIAL_LINKS.length) * Math.PI * 2;
      const radius = 5.5;
      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 4);
      
      orbs.current.push({
        mesh,
        data: link,
        hovered: false,
        basePos: mesh.position.clone(),
        phase: Math.random() * Math.PI * 2
      });
      scene.add(mesh);
    });

    const raycaster = new THREE.Raycaster();
    let currentHover: any = null;

    const onPointerMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // Disable click on orbs - only visual decoration
    // const onPointerClick = (e: MouseEvent) => {
    //   if ((e.target as HTMLElement).closest('.interactive')) return;
    //   raycaster.setFromCamera(mouse.current, camera);
    //   const intersects = raycaster.intersectObjects(orbs.current.map(o => o.mesh));
    //   if (intersects.length > 0) {
    //     const found = orbs.current.find(o => o.mesh === intersects[0].object);
    //     if (found) window.open(found.data.url, '_blank');
    //   }
    // };

    window.addEventListener('mousemove', onPointerMove);
    // window.addEventListener('click', onPointerClick); // Disabled

    let frameCount = 0;
    
    const animate = () => {
      const time = performance.now() * 0.001;
      bgMaterial.uniforms.uTime.value = time;
      frameCount++;

      // Smooth background transition
      if (frameCount % 3 === 0) {
        bgMaterial.uniforms.uColor1.value.lerp(new THREE.Color(theme === 'dark' ? '#050505' : '#ffffff'), 0.05);
        bgMaterial.uniforms.uColor2.value.lerp(new THREE.Color(theme === 'dark' ? '#101216' : '#f0f0f5'), 0.05);
      }

      // Raycast for hover
      raycaster.setFromCamera(mouse.current, camera);
      const intersects = raycaster.intersectObjects(orbs.current.map(o => o.mesh));
      if (intersects.length > 0) {
        const orb = orbs.current.find(o => o.mesh === intersects[0].object);
        if (orb && !orb.hovered) {
          if (currentHover) gsap.to(currentHover.mesh.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
          orb.hovered = true;
          currentHover = orb;
          onOrbHover(orb.data.name);
          gsap.to(orb.mesh.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.6, ease: "back.out(1.7)" });
        }
      } else if (currentHover) {
        gsap.to(currentHover.mesh.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" });
        currentHover.hovered = false;
        currentHover = null;
        onOrbHover(null);
      }

      // Snow Animation - always animate smoothly
      if (snowParticles.current && frameCount % 3 === 0) {
        const posAttr = snowParticles.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < snowCount; i++) {
          posAttr[i * 3 + 1] -= snowSpeeds[i];
          posAttr[i * 3] += Math.sin(time + i) * 0.005;
          if (posAttr[i * 3 + 1] < -15) posAttr[i * 3 + 1] = 15;
        }
        snowParticles.current.geometry.attributes.position.needsUpdate = true;
      }

      // Orb Movement - Pure time-based animation, COMPLETELY independent of scroll
      orbs.current.forEach((orb, i) => {
        const slowTime = time * 0.4;
        const floatY = Math.sin(slowTime + orb.phase) * 0.8;
        const floatX = Math.cos(slowTime + orb.phase * 0.5) * 0.4;
        const floatZ = Math.sin(slowTime * 0.7 + orb.phase) * 0.5;
        
        // Target position based only on basePos + floating animation
        const targetX = orb.basePos.x + floatX;
        const targetY = orb.basePos.y + floatY;
        const targetZ = orb.basePos.z + floatZ;
        
        // Smooth interpolation to target
        orb.mesh.position.x += (targetX - orb.mesh.position.x) * 0.08;
        orb.mesh.position.y += (targetY - orb.mesh.position.y) * 0.08;
        orb.mesh.position.z += (targetZ - orb.mesh.position.z) * 0.08;
        
        // Continuous rotation
        orb.mesh.rotation.y += 0.005;
        orb.mesh.rotation.x += 0.002;
        orb.mesh.rotation.z += 0.001;
      });

      // Camera stays fixed
      camera.position.z = 10;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      // window.removeEventListener('click', onPointerClick); // Disabled
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [theme]); // Only re-create on theme change, NOT on scroll

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-auto" />;
};

export default WebGLCanvas;
