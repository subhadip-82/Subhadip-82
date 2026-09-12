'use client';
import { useEffect, useRef } from 'react';
import TiltCard from './TiltCard';
import styles from './Contact.module.css';

const CONTACTS = [
  { icon: '✉', label: 'Email', val: 'subhadipchowdhury1998@gmail.com', href: 'mailto:subhadipchowdhury1998@gmail.com', color: 'cyan' },
  { icon: '💼', label: 'LinkedIn', val: 'linkedin.com/in/subho98', href: 'https://www.linkedin.com/in/subho98/', color: 'green', ext: true },
  { icon: '📞', label: 'Phone', val: '+91 7908309248', href: 'tel:+917908309248', color: 'purple' },
];

const LINES = [
  '> Initialising AI Solutions Engineer contact module...',
  '> Profile loaded: subhadip.chowdhury',
  '> Role: AI Solutions Engineer @ DXC Technology',
  '> Core Stack: LangGraph, MCP, Python, PostgreSQL, Power BI',
  '> Location: Kol-157, West Bengal, India',
  '> Status: Available for AI, BI & Automation opportunities ✓',
  '> Response time: < 24 hours',
  '> Ready. Choose a contact channel below ↓',
];

export default function Contact() {
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
    <section id="contact" className={styles.section} ref={ref}>
      <div className={styles.inner}>
        <div className="reveal">
          <div className="section-label">08 / Contact</div>
          <h2 className="section-title">
            Let&apos;s Build<br />
            <em>Something Exceptional</em>
          </h2>
          <p className={styles.sub}>
            Open to AI Solutions, Agentic AI, Senior BI, and Enterprise Automation roles. Reaching out directly guarantees a response within 24 hours.
          </p>
        </div>

        {/* Terminal window with 3D Tilt */}
        <TiltCard max={8} scale={1.01} glowColor="rgba(34, 211, 238, 0.25)">
          <div className={`${styles.terminal} reveal`}>
            <div className={styles.termBar}>
              <span className={`${styles.termDot} ${styles.red}`} />
              <span className={`${styles.termDot} ${styles.yellow}`} />
              <span className={`${styles.termDot} ${styles.green}`} />
              <span className={styles.termTitle}>subhadip@ai-engine ~ terminal</span>
            </div>
            <div className={styles.termBody}>
              {LINES.map((l, i) => (
                <div
                  key={i}
                  className={styles.termLine}
                  style={{ animationDelay: `${0.2 + i * 0.15}s` }}
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* Contact cards with 3D Tilt */}
        <div className={`${styles.cards} reveal`}>
          {CONTACTS.map((c) => (
            <TiltCard key={c.label} max={12} scale={1.03} glowColor="rgba(74, 222, 128, 0.25)">
              <a
                href={c.href}
                className={`${styles.card} ${styles[`card_${c.color}`]}`}
                target={c.ext ? '_blank' : undefined}
                rel={c.ext ? 'noopener noreferrer' : undefined}
              >
                <div className={`${styles.cardIcon} ${styles[`icon_${c.color}`]}`}>{c.icon}</div>
                <div>
                  <div className={`${styles.cardLabel} ${styles[`col_${c.color}`]}`}>{c.label}</div>
                  <div className={styles.cardVal}>{c.val}</div>
                </div>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
