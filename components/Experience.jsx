'use client';
import { useEffect, useRef } from 'react';
import TiltCard from './TiltCard';
import styles from './Experience.module.css';

const EXPERIENCES = [
  {
    role: 'AI Solutions Engineer',
    company: 'DXC Technology',
    period: 'Mar 2025 – Present',
    location: 'Kolkata, India',
    tech: ['LangGraph', 'MCP Protocol', 'Python (Asyncio)', 'PostgreSQL', 'REST APIs', 'Claude Code'],
    impacts: [
      { val: 'LangGraph', label: 'State Orchestration', color: 'cyan' },
      { val: 'MCP', label: 'Tool Connectors', color: 'purple' },
      { val: 'PostgreSQL', label: 'Execution Audit Store', color: 'green' },
      { val: 'Human-in-Loop', label: 'Risk Escalation', color: 'amber' },
    ],
    bullets: [
      { icon: '🤖', text: 'Building an agent-based patch remediation workflow in LangGraph — evaluating vulnerability risk, checking patch compatibility, and executing updates automatically with mandatory human approval for high-risk steps.' },
      { icon: '💾', text: 'Designed the PostgreSQL schema storing agent run history, node-by-node execution state, and checkpoints, allowing any run to be replayed or audited after the fact.' },
      { icon: '🔌', text: 'Built custom Model Context Protocol (MCP) tools so the agent can query vulnerability databases and pull live system status without hardcoding separate integrations for each data source.' },
      { icon: '🔀', text: 'Implemented retry and fallback logic for failed execution steps, setting up conditional routing so the agent escalates to a human operator when encountering edge cases.' },
      { icon: '⚡', text: 'Utilizing Claude Code day to day to prototype and test new agent modules rapidly before deployment into the production pipeline.' },
    ],
  },
  {
    role: 'Senior Analyst — BI & Enterprise Automation',
    company: 'DXC Technology',
    period: 'Jan 2021 – Mar 2025',
    location: 'Kolkata, India',
    tech: ['Power BI', 'DAX', 'SQL', 'PowerShell', 'ServiceNow', 'Azure Data Lake', 'Oracle'],
    impacts: [
      { val: '100+', label: 'Enterprise Accounts', color: 'cyan' },
      { val: '40%', label: 'Reporting Effort Cut', color: 'green' },
      { val: '35%', label: 'Ingestion Effort Cut', color: 'amber' },
      { val: '135', label: 'FTE-Hours Saved', color: 'purple' },
    ],
    bullets: [
      { icon: '📊', text: 'Built and maintained Power BI dashboards (DORM platform) covering incidents, problems, changes, and service requests, rolled out to 100+ enterprise accounts.' },
      { icon: '📈', text: 'Wrote complex DAX measures for ticket aging, reassignment counts, and SLA compliance that cut recurring manual reporting work by about 40%.' },
      { icon: '☁️', text: 'Set up automated ingestion pipelines from Azure Data Lake and Oracle for CMDB assets, job health, and CPU/memory telemetry, cutting manual reporting effort by roughly 35%.' },
      { icon: '⚙️', text: 'Wrote PowerShell scripts to detect and remove unauthorized software across 20,000+ endpoints, saving an estimated 135 FTE-hours of manual audit work.' },
      { icon: '🔒', text: 'Applied Row-Level Security (RLS) in Power BI so each client account only sees its own data across 100+ concurrent customer deployments.' },
    ],
  },
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
        <h2 className="section-title">
          Professional <em>Experience</em>
        </h2>
      </div>

      <div className={styles.expList}>
        {EXPERIENCES.map((exp, idx) => (
          <TiltCard key={exp.role} max={10} scale={1.01} glowColor="rgba(34, 211, 238, 0.2)">
            <div className={`${styles.card} reveal`}>
              {/* Top accent line */}
              <div className={styles.topBar} />

              {/* Header */}
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  <div className={styles.role}>{exp.role}</div>
                  <div className={styles.company}>{exp.company}</div>
                </div>
                <div className={styles.headerRight}>
                  <div className={styles.period}>{exp.period}</div>
                  <div className={styles.location}>📍 {exp.location}</div>
                </div>
              </div>

              {/* Tech Tags */}
              <div className={styles.techList}>
                {exp.tech.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Impact metrics row */}
              <div className={styles.impacts}>
                {exp.impacts.map((m) => (
                  <div className={`${styles.impactChip} ${styles[m.color]}`} key={m.label}>
                    <div className={styles.impactVal}>{m.val}</div>
                    <div className={styles.impactLabel}>{m.label}</div>
                  </div>
                ))}
              </div>

              <div className={styles.divider} />

              {/* Bullets */}
              <ul className={styles.bullets}>
                {exp.bullets.map((b, i) => (
                  <li key={i} className={styles.bullet}>
                    <span className={styles.bulletIcon}>{b.icon}</span>
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
