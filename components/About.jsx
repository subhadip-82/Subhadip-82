'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import TiltCard from './TiltCard';
import styles from './About.module.css';

const STACK = [
  'LangGraph',
  'MCP Tools',
  'Claude Code',
  'Python (Asyncio)',
  'PostgreSQL',
  'Power BI',
  'DAX',
  'SQL',
  'PowerShell',
  'Power Automate',
  'Azure Data Lake',
  'AWS S3',
  'ServiceNow CMDB',
  'RHCSA Linux',
];

const META = [
  { key: 'Location', val: 'Kol-157, West Bengal, India' },
  { key: 'Current Role', val: 'AI Solutions Engineer @ DXC Technology' },
  { key: 'Phone', val: '+91 7908309248' },
  { key: 'Email', val: 'subhadipchowdhury1998@gmail.com' },
  { key: 'LinkedIn', val: 'linkedin.com/in/subho98' },
  { key: 'Experience', val: '5+ Years Enterprise Technology' },
  { key: 'Specialities', val: 'Agentic AI, LangGraph, MCP, Power BI & Automation' },
];

export default function About() {
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
    <section id="about" className={styles.section} ref={ref}>
      <div className="reveal">
        <div className="section-label">01 / About</div>
        <h2 className="section-title">
          Architecting <em>Agentic AI</em> &amp; Enterprise Systems
        </h2>
      </div>

      <div className={styles.grid}>
        {/* LEFT: photo card with 3D Tilt */}
        <div className={`${styles.photoCol} reveal`}>
          <TiltCard max={14} scale={1.03} glowColor="rgba(34, 211, 238, 0.3)">
            <div className={styles.photoCard}>
              <div className={styles.photoWrap}>
                <Image
                  src="/profile.jpg"
                  alt="Subhadip Chowdhury"
                  fill
                  sizes="(max-width: 600px) 160px, 220px"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority
                />
                <div className={styles.photoGradient} />
              </div>
              <div className={styles.photoFooter}>
                <div className={styles.photoName}>Subhadip Chowdhury</div>
                <div className={styles.photoBadge}>
                  <span className={styles.onlineDot} />
                  AI Solutions Engineer · DXC Technology
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Tech stack mini tags */}
          <div className={styles.stackWrap}>
            <div className={styles.stackLabel}>// core_technologies</div>
            <div className={styles.stackTags}>
              {STACK.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: bio + meta */}
        <div className={styles.right}>
          <div className={`${styles.bioBlock} reveal`}>
            <p>
              I&apos;m an <strong>AI Solutions Engineer</strong> at DXC Technology with over{' '}
              <strong>5+ years of enterprise technology experience</strong> across banking and infrastructure environments. My expertise spans <strong>business intelligence</strong>, <strong>large-scale endpoint automation</strong>, and production <strong>agentic AI systems</strong>.
            </p>
            <p>
              Currently, I design and build production <strong>LangGraph agents</strong> featuring <strong>Model Context Protocol (MCP)</strong> tool integrations for automated infrastructure remediation. I design PostgreSQL schemas for tracking execution history, node-by-node states, and checkpoints so agent runs can be replayed or audited after the fact.
            </p>
            <p>
              My background is anchored by years of high-impact <strong>Power BI reporting</strong>, <strong>DAX measures</strong>, <strong>SQL/ETL pipelines</strong>, and <strong>PowerShell scripts</strong> across <strong>20,000+ endpoints</strong> — eliminating 135+ FTE-hours of manual audit work and cutting reporting effort by 40%.
            </p>
          </div>

          {/* Meta table wrapped in 3D tilt */}
          <TiltCard max={8} scale={1.01} glowColor="rgba(167, 139, 250, 0.2)">
            <div className={`${styles.metaTable} reveal`}>
              {META.map((m) => (
                <div className={styles.metaRow} key={m.key}>
                  <span className={styles.metaKey}>{m.key}</span>
                  <span className={styles.metaVal}>{m.val}</span>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
