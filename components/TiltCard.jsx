'use client';
import { useState, useRef } from 'react';
import styles from './TiltCard.module.css';

export default function TiltCard({ children, className = '', style = {}, max = 12, scale = 1.02, glowColor = 'rgba(34, 211, 238, 0.15)' }) {
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    const rotateX = -mouseY * max;
    const rotateY = mouseX * max;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`);

    // Glare position (0% to 100%)
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;
    setGlare({ x: glareX, y: glareY, opacity: 0.8 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.tiltWrapper} ${className}`}
      style={{
        transform,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className={styles.glareOverlay}
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${glowColor} 0%, transparent 70%)`,
          opacity: glare.opacity,
        }}
      />
    </div>
  );
}
