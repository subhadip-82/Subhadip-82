'use client';
import { useEffect, useRef } from 'react';
import TiltCard from './TiltCard';
import styles from './Achievements.module.css';

const AWARDS = [
  { icon: '🏆', title: 'Champion Award', sub: 'FY26 H1 — Diamond Excellence Award', color: 'amber' },
  { icon: '💎', title: 'Diamond Excellence Award', sub: 'Enterprise Innovation & Agentic AI', color: 'cyan' },
  { icon: '⭐', title: 'Champ Award', sub: 'FY24 Q4 · FY23 Q1 & Q4', color: 'green' },
  { icon: '🥈', title: 'Portfolio Star Runner-Up', sub: 'FY23 Excellence Recognition', color: 'purple' },
];

export default function Achievements() {
  const ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  return (
    <section id="achievements" className={styles.section} ref={ref}>
      <div className="reveal">
        <div className="section-label">07 / Recognition</div>
        <h2 className="section-title">
          Honors &amp; <em>Achievements</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {AWARDS.map((a) => (
          <TiltCard key={a.title} max={15} scale={1.04} glowColor="rgba(251, 191, 36, 0.3)">
            <div className={`${styles.card} ${styles[`card_${a.color}`]} reveal`}>
              <div className={styles.glow} />
              <div className={`${styles.iconWrap} ${styles[`icon_${a.color}`]}`}>
                {a.icon}
              </div>
              <div className={styles.title}>{a.title}</div>
              <div className={styles.sub}>{a.sub}</div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
