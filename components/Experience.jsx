'use client';
import { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

const IMPACTS = [
  { val: '100+', label: 'Dashboards', color: 'cyan'   },
  { val: '40%',  label: 'Less Manual Effort', color: 'green'  },
  { val: '300+', label: 'Stakeholders', color: 'amber'  },
  { val: '135+', label: 'FTEs Saved',  color: 'purple' },
];

const BULLETS = [
  { icon: '⚙', text: 'Automation Engineering using PowerShell, Power Automate, and Python for enterprise-scale workflows' },
  { icon: '☁', text: 'Multi-source data integration across AWS S3, Azure Blob, SQL, and Oracle hybrid environments' },
  { icon: '🔒', text: 'Secure analytics deployment with Row-Level Security (RLS), governance frameworks, and client data segregation' },
  { icon: '📊', text: 'Built monitoring, alerting, and operational health intelligence frameworks for 300+ stakeholders' },
  { icon: '🚀', text: 'Led cross-functional deployment of 100+ enterprise dashboards — reducing reporting effort by 40%' },
  { icon: '🤝', text: 'Owned end-to-end project lifecycle from requirements gathering to production deployment' },
];

export default function Experience() {
  const ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  return (
    <section id="experience" className={styles.section} ref={ref}>
      <div className="reveal">
        <div className="section-label">02 / Experience</div>
        <h2 className="section-title">Work <em>Experience</em></h2>
      </div>

      <div className={`${styles.card} reveal`}>
        {/* Top accent line */}
        <div className={styles.topBar} />

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.role}>Senior Analyst</div>
            <div className={styles.company}>DXC Technology</div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.period}>Jan 2021 – Present</div>
            <div className={styles.location}>📍 Kolkata, India</div>
          </div>
        </div>

        {/* Impact metrics row */}
        <div className={styles.impacts}>
          {IMPACTS.map((m) => (
            <div className={`${styles.impactChip} ${styles[m.color]}`} key={m.label}>
              <div className={styles.impactVal}>{m.val}</div>
              <div className={styles.impactLabel}>{m.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        {/* Bullets */}
        <ul className={styles.bullets}>
          {BULLETS.map((b, i) => (
            <li key={i} className={styles.bullet}>
              <span className={styles.bulletIcon}>{b.icon}</span>
              <span>{b.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
