'use client';

import React, { useRef, useEffect } from 'react';

// Menambahkan props 'color' dengan nilai default hijau
export default function EducationShader({ color = [0.0, 0.8, 0.3] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vsSource = `
      attribute vec4 a_position;
      void main() { gl_Position = a_position; }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_color; // <-- Variabel penampung warna dari React

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv * 3.0;
        
        // Silakan ubah angka 1.5 ini jika animasinya kurang cepat/lambat
        float t = u_time * 1.5; 
        
        float noise = sin(p.x + t) * cos(p.y - t) + sin(p.x * 1.5 - t * 0.8) * cos(p.y * 2.1 + t * 0.5);
        noise = smoothstep(-1.0, 1.0, noise);

        float dotSize = 4.0;
        vec2 grid = fract(gl_FragCoord.xy / dotSize);
        float dots = step(0.4, length(grid - 0.5));

        // Warna dasar diubah jadi hitam netral agar cocok dipadukan dengan warna apa saja
        vec3 dark = vec3(0.02, 0.02, 0.02); 
        
        // Memadukan warna hitam dengan warna kustom (u_color)
        vec3 finalColor = mix(dark, u_color, noise);
        finalColor *= dots; 

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resLocation = gl.getUniformLocation(program, "u_resolution");
    const colorLocation = gl.getUniformLocation(program, "u_color"); // Menangkap lokasi variabel warna

    let animationFrameId;
    let startTime = Date.now();

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

      gl.uniform2f(resLocation, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000);
      
      // Mengirim array warna dari React ke dalam Shader WebGL
      gl.uniform3fv(colorLocation, color); 

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [color]); // Tambahkan color sebagai dependency agar bisa re-render jika berubah

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50" 
      style={{ zIndex: 0, display: 'block' }}
    />
  );
}