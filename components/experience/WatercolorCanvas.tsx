"use client";

import { useEffect, useRef } from "react";

/**
 * Echtzeit-Aquarell-Hintergrund (roher WebGL-Fragment-Shader).
 * Domain-warped fbm-Noise in den Atelier-Farben, das langsam lebt und
 * um den Cursor Pigment aufblühen lässt. Respektiert prefers-reduced-motion.
 */
const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
  vec2 u = f*f*(3.-2.*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x*aspect, uv.y);
  float t = u_time*0.025;

  vec2 q = vec2(fbm(p*2.2 + t), fbm(p*2.2 + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(p*2.2 + 3.0*q + vec2(1.7,9.2)), fbm(p*2.2 + 3.0*q + vec2(8.3,2.8)));
  float f = fbm(p*2.2 + 3.0*r);

  vec3 mint = vec3(0.482,0.933,0.874);
  vec3 sky  = vec3(0.341,0.788,0.925);
  vec3 teal = vec3(0.360,0.905,0.870);
  vec3 coral= vec3(1.000,0.435,0.569);
  vec3 yellow=vec3(1.000,0.788,0.302);

  vec3 col = mint;
  col = mix(col, sky,  smoothstep(0.15,0.65,f));
  col = mix(col, teal, smoothstep(0.35,0.85, length(q)));
  col = mix(col, mix(col, coral, 0.9), 0.10*smoothstep(0.62,0.92,r.x));
  col = mix(col, mix(col, yellow,0.9), 0.07*smoothstep(0.60,0.95,r.y));

  // aufhellen für Lesbarkeit
  col = mix(col, vec3(0.94,0.99,0.96), 0.32);

  // Pigment-Aufblühen um den Cursor
  vec2 m = vec2(u_mouse.x*aspect, u_mouse.y);
  float d = distance(p, m);
  float bloom = smoothstep(0.40, 0.0, d);
  col = mix(col, mix(col, coral, 0.85), bloom*0.22);

  // feines Korn
  float g = hash(gl_FragCoord.xy + t) * 0.03 - 0.015;
  col += g;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function WatercolorCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: 0.5, y: 0.6, tx: 0.5, ty: 0.6 };
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    const resize = () => {
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    if (reduce) {
      gl.uniform1f(uTime, 8);
      gl.uniform2f(uMouse, 0.5, 0.6);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(render);
    }

    const onVis = () => {
      if (reduce) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(render);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="wc-canvas" aria-hidden="true" />;
}
