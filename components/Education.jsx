'use client';
import { useEffect, useRef } from 'react';
import styles from './Education.module.css';

const EDU = [
  {
    degree: 'B.Tech — Bachelor of Technology',
    school: 'AIEM, Hooghly',
    period: '2016 – 2020',
    score:  'DGPA 7.53 / 10',
    color:  'cyan',
  },
  {
    degree: 'Higher Secondary (Class XII)',
    school: 'Burdwan C.M.S High School',
    period: '2014 – 2016',
    score:  '85%',
    color:  'green',
  },
];

const CERTS = [
  {
    icon: '🏛️',
    name: 'Oracle Cloud Data Management 2022 Foundation',
    issuer: 'Oracle Corporation',
    color: 'amber',
  },
  {
    icon: '🏛️',
    name: 'Oracle Cloud Data Management 2023 Foundation',
    issuer: 'Oracle Corporation',
    color: 'amber',
  },
  {
    icon: '🎓',
    name: 'Red Hat Certified System Administrator (RHCSA)',
    issuer: 'Red Hat',
    color: 'purple',
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
        <h2 className="section-title">Academic <em>Background</em></h2>
      </div>

      <div className={styles.eduGrid}>
        {EDU.map((e) => (
          <div className={`${styles.eduCard} reveal`} key={e.degree}>
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
        ))}
      </div>

      {/* Certifications */}
      <div className={`${styles.certSection} reveal`}>
        <div className="section-label">06 / Certifications</div>
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>Professional <em>Certifications</em></h2>
      </div>

      <div className={styles.certGrid}>
        {CERTS.map((c) => (
          <div className={`${styles.certCard} reveal`} key={c.name}>
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
        ))}
      </div>
    </section>
  );
}
