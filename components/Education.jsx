'use client';
import { useEffect, useRef } from 'react';
import TiltCard from './TiltCard';
import styles from './Education.module.css';

const EDU = [
  {
    degree: 'B.Tech — Computer Engineering',
    school: 'A.I.E.M, Hooghly',
    period: '2016 – 2020',
    score: 'DGPA 7.53',
    color: 'cyan',
  },
  {
    degree: 'Higher Secondary (Science)',
    school: 'Burdwan C.M.S High School',
    period: '2014 – 2016',
    score: '85.0%',
    color: 'green',
  },
];

const CERTS = [
  {
    icon: '🎓',
    name: 'RHCSA — Red Hat Certified System Administrator',
    issuer: 'Red Hat',
    color: 'purple',
  },
  {
    icon: '☁️',
    name: 'Oracle Cloud Data Management Foundation (2022, 2023)',
    issuer: 'Oracle Corporation',
    color: 'amber',
  },
];

export default function Education() {
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
    <section id="education" className={styles.section} ref={ref}>
      {/* Education */}
      <div className="reveal">
        <div className="section-label">05 / Education</div>
        <h2 className="section-title">
          Academic <em>Background</em>
        </h2>
      </div>

      <div className={styles.eduGrid}>
        {EDU.map((e) => (
          <TiltCard key={e.degree} max={12} scale={1.03} glowColor="rgba(34, 211, 238, 0.25)">
            <div className={`${styles.eduCard} reveal`}>
              <div className={`${styles.eduBar} ${styles[`bar_${e.color}`]}`} />
              <div className={styles.eduBody}>
                <div className={styles.eduDegree}>{e.degree}</div>
                <div className={`${styles.eduSchool} ${styles[`col_${e.color}`]}`}>{e.school}</div>
                <div className={styles.eduMeta}>
                  <span>📅 {e.period}</span>
                  <span>⭐ {e.score}</span>
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Certifications */}
      <div className={`${styles.certSection} reveal`}>
        <div className="section-label">06 / Certifications</div>
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>
          Professional <em>Certifications</em>
        </h2>
      </div>

      <div className={styles.certGrid}>
        {CERTS.map((c) => (
          <TiltCard key={c.name} max={12} scale={1.03} glowColor="rgba(167, 139, 250, 0.25)">
            <div className={`${styles.certCard} reveal`}>
              <div className={`${styles.certIcon} ${styles[`certIcon_${c.color}`]}`}>
                {c.icon}
              </div>
              <div className={styles.certBody}>
                <div className={styles.certName}>{c.name}</div>
                <div className={`${styles.certIssuer} ${styles[`col_${c.color}`]}`}>
                  {c.issuer}
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
