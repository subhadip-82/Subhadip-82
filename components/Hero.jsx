'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import TypeWriter from './TypeWriter';
import TiltCard from './TiltCard';
import styles from './Hero.module.css';

const Hero3DCanvas = dynamic(() => import('./Hero3DCanvas'), { ssr: false });

const STATS = [
  { value: 5, suffix: '+', label: 'Years Enterprise Experience', color: 'cyan' },
  { value: 20, suffix: 'K+', label: 'Endpoints Automated', color: 'purple' },
  { value: 40, suffix: '%', label: 'Manual Effort Cut', color: 'amber' },
  { value: 100, suffix: '+', label: 'Enterprise Accounts Covered', color: 'green' },
];

function StatCounter({ value, suffix, label, color, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = null;
    const dur = 1800;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - prog, 3); // ease-out cubic
      setCount(Math.floor(ease * value));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, value]);

  return (
    <TiltCard max={15} scale={1.05} glowColor="rgba(34, 211, 238, 0.25)">
      <div className={`${styles.statChip} ${styles[`color_${color}`]}`}>
        <div className={styles.statNum}>
          {count}{suffix}
        </div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </TiltCard>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setActive(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero} ref={ref}>
      {/* 3D Visual Background */}
      <div className={styles.gridLines} />
      <div className={styles.gradientOrb1} />
      <div className={styles.gradientOrb2} />
      {mounted && <Hero3DCanvas />}

      {/* Content */}
      <div className={styles.content}>
        {/* Top badge */}
        <div className={`${styles.badge} ${mounted ? styles.in0 : ''}`}>
          <span className={styles.badgeDot} />
          <span>Available for AI Solutions, Agentic AI &amp; Enterprise Automation Roles</span>
        </div>

        {/* Name */}
        <h1 className={`${styles.name} ${mounted ? styles.in1 : ''}`}>
          Subhadip<br />
          <span className={styles.nameGrad}>Chowdhury</span>
        </h1>

        {/* Typewriter */}
        <div className={`${styles.roleRow} ${mounted ? styles.in2 : ''}`}>
          <span className={styles.rolePrefix}>{'>'}</span>
          <TypeWriter />
        </div>

        {/* Summary */}
        <p className={`${styles.summary} ${mounted ? styles.in3 : ''}`}>
          <strong>AI Solutions Engineer</strong> with <strong>5+ years</strong> of enterprise tech experience across banking &amp; infrastructure. Building production <strong>LangGraph agents</strong> with <strong>Model Context Protocol (MCP)</strong> tool integrations, backed by <strong>Power BI</strong>, <strong>PostgreSQL</strong>, and <strong>SQL/ETL pipelines</strong> across <strong>20,000+ endpoints</strong>.
        </p>

        {/* Stat chips with 3D tilt */}
        <div className={`${styles.stats} ${mounted ? styles.in4 : ''}`}>
          {STATS.map((s) => (
            <StatCounter key={s.label} {...s} active={active} />
          ))}
        </div>

        {/* CTAs */}
        <div className={`${styles.ctas} ${mounted ? styles.in5 : ''}`}>
          <a href="#contact" className="btn-primary" onClick={(e) => go(e, '#contact')}>
            Get In Touch
          </a>
          <a
            href="/Resume.pdf"
            download="Subhadip_Chowdhury_CV.pdf"
            className={styles.downloadCv}
          >
            ↓ Download Updated CV
          </a>
          <a href="#projects" className="btn-ghost" onClick={(e) => go(e, '#projects')}>
            Explore Agentic &amp; BI Projects
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollLine}>
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
}
