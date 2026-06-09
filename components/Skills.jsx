'use client';
import { useEffect, useRef } from 'react';
import styles from './Skills.module.css';

const GROUPS = [
  {
    cat: 'Business Intelligence', color: 'cyan', icon: '📊',
    skills: [
      { name: 'Power BI & DAX',          pct: 95 },
      { name: 'Data Modelling',           pct: 92 },
      { name: 'RLS & Incremental Refresh',pct: 90 },
      { name: 'Query Folding / DirectQ',  pct: 85 },
    ],
  },
  {
    cat: 'Data Engineering', color: 'green', icon: '🔧',
    skills: [
      { name: 'SQL Optimisation',   pct: 92 },
      { name: 'ETL / Star Schema',  pct: 88 },
      { name: 'Data Transformation',pct: 85 },
      { name: 'Pipeline Design',    pct: 82 },
    ],
  },
  {
    cat: 'Automation', color: 'purple', icon: '⚙️',
    skills: [
      { name: 'PowerShell',     pct: 90 },
      { name: 'Power Automate', pct: 88 },
      { name: 'Python',         pct: 75 },
      { name: 'Task Scheduler', pct: 85 },
    ],
  },
  {
    cat: 'Cloud & Storage', color: 'amber', icon: '☁️',
    skills: [
      { name: 'Azure Blob / Data Lake', pct: 83 },
      { name: 'AWS S3',                 pct: 80 },
      { name: 'Oracle DB',              pct: 78 },
      { name: 'SharePoint',             pct: 88 },
    ],
  },
  {
    cat: 'Containerization', color: 'cyan', icon: '🐳',
    skills: [
      { name: 'Docker',     pct: 72 },
      { name: 'Kubernetes', pct: 65 },
    ],
  },
  {
    cat: 'Leadership & Delivery', color: 'green', icon: '🤝',
    skills: [
      { name: 'Stakeholder Management',     pct: 92 },
      { name: 'Cross-functional Delivery',  pct: 88 },
      { name: 'Deployment Ownership',       pct: 90 },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const revealObs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    const barObs = new IntersectionObserver(
      (es) => es.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-pct]').forEach((bar) => {
            const p = bar.getAttribute('data-pct');
            setTimeout(() => { bar.style.width = p + '%'; }, 200);
          });
          barObs.unobserve(entry.target);
        }
      }),
      { threshold: 0.25 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));
    ref.current?.querySelectorAll(`.${styles.group}`).forEach((g) => barObs.observe(g));
    return () => { revealObs.disconnect(); barObs.disconnect(); };
  }, []);

  return (
    <section id="skills" className={styles.section} ref={ref}>
      <div className="reveal">
        <div className="section-label">04 / Skills</div>
        <h2 className="section-title">Technical <em>Expertise</em></h2>
      </div>

      <div className={styles.layout}>
        {GROUPS.map((g) => (
          <div className={`${styles.group} reveal`} key={g.cat}>
            <div className={styles.groupHead}>
              <span className={styles.groupIcon}>{g.icon}</span>
              <span className={`${styles.groupTitle} ${styles[`title_${g.color}`]}`}>
                {g.cat}
              </span>
            </div>
            <div className={styles.skillList}>
              {g.skills.map((s) => (
                <div className={styles.skillItem} key={s.name}>
                  <div className={styles.skillTop}>
                    <span className={styles.skillName}>{s.name}</span>
                    <span className={`${styles.skillPct} ${styles[`pct_${g.color}`]}`}>
                      {s.pct}%
                    </span>
                  </div>
                  <div className={styles.barBg}>
                    <div
                      className={`${styles.barFill} ${styles[`bar_${g.color}`]}`}
                      data-pct={s.pct}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
