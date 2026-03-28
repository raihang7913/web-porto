
import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      // Lightweight smooth interpolation
      const speed = 0.2;
      pos.current.x += (mouse.current.x - pos.current.x) * speed;
      pos.current.y += (mouse.current.y - pos.current.y) * speed;

      if (dotRef.current && ringRef.current) {
        const transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
        dotRef.current.style.transform = transform;
        ringRef.current.style.transform = transform;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-blue-400/40 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      <style>{`
        * { cursor: none !important; }
      `}</style>
    </>
  );
};

export default CustomCursor;
