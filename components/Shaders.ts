
export const backgroundVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const backgroundFragment = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;

  void main() {
    // Subtle organic movement for the background gradient
    float noise = sin(vUv.x * 2.5 + uTime * 0.1) * cos(vUv.y * 1.5 - uTime * 0.15) * 0.5 + 0.5;
    vec3 color = mix(uColor1, uColor2, vUv.y + (noise * 0.15));
    gl_FragColor = vec4(color, 1.0);
  }
`;
