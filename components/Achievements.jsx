'use client';
import { useEffect, useRef } from 'react';
import styles from './Achievements.module.css';

const AWARDS = [
  { icon: '🏆', title: 'Champion Award',           sub: 'FY26 H1',                      color: 'amber'  },
  { icon: '💎', title: 'Diamond Excellence Award', sub: 'Best Team Contribution',        color: 'cyan'   },
  { icon: '⭐', title: 'Champ Award',              sub: 'FY24 Q4 · FY23 Q1 & Q4',       color: 'green'  },
  { icon: '🥈', title: 'Runner Up Top Contributor',sub: 'Portfolio Star – CNEE FY23',    color: 'purple' },
  { icon: '🤝', title: 'Collaborators Award',      sub: 'H1 & H2 FY23',                 color: 'cyan'   },
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
        <h2 className="section-title">Awards &amp; <em>Achievements</em></h2>
      </div>

      <div className={styles.grid}>
        {AWARDS.map((a) => (
          <div className={`${styles.card} ${styles[`card_${a.color}`]} reveal`} key={a.title}>
            <div className={styles.glow} />
            <div className={`${styles.iconWrap} ${styles[`icon_${a.color}`]}`}>
              {a.icon}
            </div>
            <div className={styles.title}>{a.title}</div>
            <div className={styles.sub}>{a.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
