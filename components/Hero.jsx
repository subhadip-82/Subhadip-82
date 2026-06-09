'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import TypeWriter from './TypeWriter';
import styles from './Hero.module.css';

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), { ssr: false });

const STATS = [
  { value: 5,    suffix: '+', label: 'Years Experience',      color: 'cyan'   },
  { value: 100,  suffix: '+', label: 'Dashboards Delivered',  color: 'green'  },
  { value: 40,   suffix: '%', label: 'Reporting Effort Saved',color: 'amber'  },
  { value: 20,   suffix: 'K+',label: 'Endpoints Managed',     color: 'purple' },
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
    <div className={`${styles.statChip} ${styles[`color_${color}`]}`}>
      <div className={styles.statNum}>
        {count}{suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted]   = useState(false);
  const [active, setActive]     = useState(false);
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
      {/* Backgrounds */}
      <div className={styles.gridLines} />
      <div className={styles.gradientOrb1} />
      <div className={styles.gradientOrb2} />
      {mounted && <ParticleCanvas />}

      {/* Content */}
      <div className={styles.content}>
        {/* Top badge */}
        <div className={`${styles.badge} ${mounted ? styles.in0 : ''}`}>
          <span className={styles.badgeDot} />
          <span>Available for Senior BI &amp; Data Engineering Roles</span>
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
          Designing scalable BI and automation solutions across banking and enterprise infrastructure.
          Turning complex multi-source data into operational clarity for <strong>300+ stakeholders</strong>.
        </p>

        {/* Stat chips */}
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
            ↓ Download CV
          </a>
          <a href="#projects" className="btn-ghost" onClick={(e) => go(e, '#projects')}>
            View Projects
          </a>
          <a href="#skills" className={styles.learnMore} onClick={(e) => go(e, '#skills')}>
            Explore Skills ↓
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
