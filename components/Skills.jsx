'use client';
import { useEffect, useRef } from 'react';
import TiltCard from './TiltCard';
import styles from './Skills.module.css';

const GROUPS = [
  {
    cat: 'Agentic AI & Orchestration',
    color: 'cyan',
    icon: '🤖',
    skills: [
      { name: 'LangGraph (State Graphs & Checkpointing)', pct: 95 },
      { name: 'Model Context Protocol (MCP) Tools', pct: 92 },
      { name: 'Human-in-the-Loop Escalation', pct: 90 },
      { name: 'Claude Code Agentic Prototyping', pct: 94 },
    ],
  },
  {
    cat: 'Data Engineering & Databases',
    color: 'green',
    icon: '💾',
    skills: [
      { name: 'SQL & PostgreSQL Schemas', pct: 94 },
      { name: 'Star Schema Design & Modeling', pct: 92 },
      { name: 'ETL Pipeline Design', pct: 90 },
      { name: 'Query Optimization', pct: 88 },
    ],
  },
  {
    cat: 'Business Intelligence & Ops',
    color: 'amber',
    icon: '📊',
    skills: [
      { name: 'Power BI & Advanced DAX', pct: 96 },
      { name: 'Row-Level Security (RLS)', pct: 92 },
      { name: 'Incremental Refresh & Enterprise Deployments', pct: 90 },
      { name: 'CMDB & Operational Health Telemetry', pct: 88 },
    ],
  },
  {
    cat: 'Programming & Scripting',
    color: 'purple',
    icon: '⚡',
    skills: [
      { name: 'Python (Asyncio, Pydantic, REST APIs)', pct: 90 },
      { name: 'PowerShell Endpoint Automation', pct: 92 },
      { name: 'Power Automate Enterprise Workflows', pct: 88 },
      { name: 'Bash Scripting', pct: 85 },
    ],
  },
  {
    cat: 'Cloud & Enterprise Infra',
    color: 'cyan',
    icon: '☁️',
    skills: [
      { name: 'Azure Data Lake & AWS S3', pct: 88 },
      { name: 'ServiceNow CMDB & Oracle DB', pct: 86 },
      { name: 'Windows Server & RHCSA Linux', pct: 90 },
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
      (es) =>
        es.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-pct]').forEach((bar) => {
              const p = bar.getAttribute('data-pct');
              setTimeout(() => {
                bar.style.width = p + '%';
              }, 200);
            });
            barObs.unobserve(entry.target);
          }
        }),
      { threshold: 0.25 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));
    ref.current?.querySelectorAll(`.${styles.group}`).forEach((g) => barObs.observe(g));
    return () => {
      revealObs.disconnect();
      barObs.disconnect();
    };
  }, []);

  return (
    <section id="skills" className={styles.section} ref={ref}>
      <div className="reveal">
        <div className="section-label">04 / Expertise</div>
        <h2 className="section-title">
          Technical <em>Expertise</em>
        </h2>
      </div>

      <div className={styles.layout}>
        {GROUPS.map((g) => (
          <TiltCard key={g.cat} max={10} scale={1.02} glowColor="rgba(34, 211, 238, 0.2)">
            <div className={`${styles.group} reveal`}>
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
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
