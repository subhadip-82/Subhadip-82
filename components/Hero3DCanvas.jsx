'use client';
import { useEffect, useRef } from 'react';

const TECH_NODES = [
  { name: 'LangGraph', color: '#22d3ee', r: 160 },
  { name: 'MCP Protocols', color: '#a78bfa', r: 140 },
  { name: 'PostgreSQL', color: '#38bdf8', r: 170 },
  { name: 'Power BI / DAX', color: '#fbbf24', r: 150 },
  { name: 'Python (Asyncio)', color: '#4ade80', r: 180 },
  { name: 'SQL & ETL', color: '#f472b6', r: 130 },
  { name: 'PowerShell', color: '#818cf8', r: 165 },
  { name: 'Azure & CMDB', color: '#34d399', r: 145 },
];

export default function Hero3DCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Particles Sphere Math
    const PARTICLE_COUNT = 90;
    const sphereRadius = Math.min(width, height) * 0.32;

    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
      particles.push({
        x: sphereRadius * Math.cos(theta) * Math.sin(phi),
        y: sphereRadius * Math.sin(theta) * Math.sin(phi),
        z: sphereRadius * Math.cos(phi),
        baseX: sphereRadius * Math.cos(theta) * Math.sin(phi),
        baseY: sphereRadius * Math.sin(theta) * Math.sin(phi),
        baseZ: sphereRadius * Math.cos(phi),
      });
    }

    // Assign Tech Nodes around sphere points
    const techPoints = TECH_NODES.map((node, i) => {
      const step = Math.floor(particles.length / TECH_NODES.length);
      const targetParticle = particles[i * step] || particles[0];
      return {
        ...node,
        particleIndex: i * step,
      };
    });

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - width / 2) / (width / 2);
      mouseY = (e.clientY - height / 2) / (height / 2);
      targetRotY = mouseX * 0.8;
      targetRotX = -mouseY * 0.8;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let angleAuto = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleAuto += 0.005;
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const currentRotY = angleAuto + rotY;
      const currentRotX = rotX;

      const cx = width > 900 ? width * 0.72 : width * 0.5;
      const cy = height * 0.5;

      // Project 3D points
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Rotate Y
        let x1 = p.x * Math.cos(currentRotY) - p.z * Math.sin(currentRotY);
        let z1 = p.x * Math.sin(currentRotY) + p.z * Math.cos(currentRotY);

        // Rotate X
        let y2 = p.y * Math.cos(currentRotX) - z1 * Math.sin(currentRotX);
        let z2 = p.y * Math.sin(currentRotX) + z1 * Math.cos(currentRotX);

        // Perspective scale factor
        const fov = 600;
        const scale = fov / (fov + z2);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;
        const alpha = Math.max(0.1, Math.min(1, (z2 + sphereRadius) / (sphereRadius * 2)));

        projected.push({ px, py, scale, z: z2, alpha, index: i });
      }

      // Draw connecting lines between close points
      const maxDistance = 140;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.25 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(34, 211, 238, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw particle dots
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.px, p.py, 2.2 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${0.4 * p.alpha})`;
        ctx.fill();
      }

      // Draw 3D Floating Tech Badges
      techPoints.forEach((node) => {
        const proj = projected[node.particleIndex];
        if (!proj) return;

        // Draw node aura
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, 6 * proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node text pill in 3D
        if (proj.z > -sphereRadius * 0.6) {
          ctx.font = `600 ${Math.max(10, Math.round(13 * proj.scale))}px 'JetBrains Mono', monospace`;
          const textMetrics = ctx.measureText(node.name);
          const padX = 10 * proj.scale;
          const padY = 6 * proj.scale;
          const boxW = textMetrics.width + padX * 2;
          const boxH = 22 * proj.scale;
          const boxX = proj.px + 12 * proj.scale;
          const boxY = proj.py - boxH / 2;

          // Glassmorphic pill box
          ctx.fillStyle = 'rgba(12, 20, 36, 0.85)';
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, boxW, boxH, 6);
          ctx.fill();
          ctx.stroke();

          // Pill text
          ctx.fillStyle = '#f1f5f9';
          ctx.fillText(node.name, boxX + padX, boxY + boxH - padY - 2);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.8,
      }}
    />
  );
}
