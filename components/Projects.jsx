'use client';
import { useEffect, useRef } from 'react';
import TiltCard from './TiltCard';
import AgentWorkflow3D from './AgentWorkflow3D';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    num: '01',
    color: 'cyan',
    featured: true,
    name: 'LangGraph Agentic Patch Remediation & MCP Framework',
    role: 'AI Solutions Engineer',
    impact: [
      { val: '20K+', label: 'Target Endpoints' },
      { val: 'LangGraph', label: 'State Checkpoints' },
      { val: 'MCP', label: 'Protocol Tools' },
    ],
    desc: 'Production agent-based infrastructure patch remediation workflow built in LangGraph. Automatically evaluates vulnerability risk, verifies patch compatibility using custom MCP tools, enforces mandatory human-in-the-loop approvals for high-risk changes, and persists node-by-node execution state in PostgreSQL.',
    tags: ['LangGraph', 'MCP Protocol', 'Python (Asyncio)', 'PostgreSQL', 'Claude Code', 'REST APIs'],
    icon: '🤖',
  },
  {
    num: '02',
    color: 'green',
    featured: false,
    name: 'DORM – Centralized Operations Dashboard Platform',
    role: 'Senior Analyst — BI & Enterprise Automation',
    impact: [
      { val: '100+', label: 'Enterprise Accounts' },
      { val: '40%', label: 'Reporting Effort Cut' },
    ],
    desc: 'Consolidated Incidents, Problems, Service Requests, and Changes into a unified Power BI operational platform. Replaced fragmented email reporting — serving as the single source of truth for 100+ enterprise customer deployments.',
    tags: ['Power BI', 'DAX', 'SQL', 'ServiceNow', 'SharePoint', 'Power Automate'],
    icon: '📊',
  },
  {
    num: '03',
    color: 'purple',
    featured: false,
    name: 'Endpoint Security & Unauthorized Software Remediation',
    role: 'Automation Engineer',
    impact: [
      { val: '135', label: 'FTE-Hours Saved' },
      { val: '20K+', label: 'Endpoints Managed' },
    ],
    desc: 'Automated PowerShell framework monitoring enterprise endpoints via centralized jump hosts. Auto-collected software inventory, detected unauthorized installations, and executed remote uninstall operations across 20,000+ endpoints.',
    tags: ['PowerShell', 'Windows Server', 'Task Scheduler', 'Endpoint Security'],
    icon: '🔒',
  },
  {
    num: '04',
    color: 'amber',
    featured: false,
    name: 'CMDB Asset & Infrastructure Telemetry Ingestion',
    role: 'Data & BI Engineer',
    impact: [
      { val: '35%', label: 'Ingestion Effort Saved' },
      { val: 'Azure/Oracle', label: 'Data Pipelines' },
    ],
    desc: 'Automated ingestion pipelines pulling CMDB asset state, job health telemetry, and CPU/memory utilization metrics from Azure Data Lake and Oracle DB into Power BI dashboards.',
    tags: ['Azure Data Lake', 'Oracle DB', 'SQL', 'Power BI', 'Power Automate'],
    icon: '🏗️',
  },
  {
    num: '05',
    color: 'cyan',
    featured: false,
    name: 'Multi-Tenant Security Governance & RLS Architecture',
    role: 'BI & Security Specialist',
    impact: [
      { val: '100+', label: 'Segregated Accounts' },
      { val: 'RLS', label: 'Row-Level Security' },
    ],
    desc: 'Enterprise security framework implementing Row-Level Security (RLS) in Power BI, ensuring strict client data segregation so each account strictly views its own operational data across 100+ concurrent customer deployments.',
    tags: ['Power BI', 'Row-Level Security (RLS)', 'DAX', 'Data Governance'],
    icon: '🛡️',
  },
];

export default function Projects() {
  const ref = useRef(null);
  useEffect(() => {
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => ob.observe(el));
    return () => ob.disconnect();
  }, []);

  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className={styles.section} ref={ref}>
      <div className="reveal">
        <div className="section-label">03 / Agentic AI &amp; Projects</div>
        <h2 className="section-title">
          Featured <em>Agentic AI &amp; Enterprise Projects</em>
        </h2>
      </div>

      {/* 3D Interactive Agent Architecture Visualizer */}
      <div className="reveal">
        <AgentWorkflow3D />
      </div>

      <div className={styles.bento}>
        {/* ── FEATURED CARD (3D Tilt) ── */}
        <TiltCard
          className={`${styles.featCard} ${styles[`feat_${featured.color}`]} reveal`}
          max={10}
          scale={1.02}
          glowColor="rgba(34, 211, 238, 0.3)"
        >
          {/* Background glow */}
          <div className={`${styles.featGlow} ${styles[`glow_${featured.color}`]}`} />

          {/* Top row */}
          <div className={styles.featTop}>
            <div className={`${styles.featIcon} ${styles[`iconBg_${featured.color}`]}`}>
              {featured.icon}
            </div>
            <div className={styles.featBadge}>Flagship AI Project</div>
            <span className={`${styles.featNum} ${styles[`col_${featured.color}`]}`}>
              {featured.num}
            </span>
          </div>

          {/* Title */}
          <h3 className={styles.featName}>{featured.name}</h3>
          <div className={`${styles.featRole} ${styles[`col_${featured.color}`]}`}>
            {featured.role}
          </div>

          {/* Impact metrics */}
          <div className={styles.featMetrics}>
            {featured.impact.map((m) => (
              <div className={`${styles.metric} ${styles[`metric_${featured.color}`]}`} key={m.label}>
                <div className={`${styles.metricVal} ${styles[`col_${featured.color}`]}`}>
                  {m.val}
                </div>
                <div className={styles.metricLabel}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className={styles.featDesc}>{featured.desc}</p>

          {/* Tags */}
          <div className={styles.tags}>
            {featured.tags.map((t) => (
              <span className={`${styles.featTag} ${styles[`featTag_${featured.color}`]}`} key={t}>
                {t}
              </span>
            ))}
          </div>
        </TiltCard>

        {/* ── REGULAR CARDS (3D Tilt) ── */}
        {rest.map((p) => (
          <TiltCard
            key={p.num}
            className={`${styles.card} ${styles[`card_${p.color}`]} reveal`}
            max={12}
            scale={1.03}
            glowColor="rgba(167, 139, 250, 0.25)"
          >
            <div className={`${styles.cardGlow} ${styles[`glow_${p.color}`]}`} />

            <div className={styles.cardTop}>
              <div className={`${styles.cardIcon} ${styles[`iconBg_${p.color}`]}`}>
                {p.icon}
              </div>
              <span className={`${styles.cardNum} ${styles[`col_${p.color}`]}`}>
                {p.num}
              </span>
            </div>

            <h3 className={styles.cardName}>{p.name}</h3>
            <div className={`${styles.cardRole} ${styles[`col_${p.color}`]}`}>{p.role}</div>

            {/* Mini metrics row */}
            <div className={styles.miniMetrics}>
              {p.impact.map((m) => (
                <div className={`${styles.miniChip} ${styles[`miniChip_${p.color}`]}`} key={m.label}>
                  <span className={`${styles.miniVal} ${styles[`col_${p.color}`]}`}>{m.val}</span>
                  <span className={styles.miniLabel}>{m.label}</span>
                </div>
              ))}
            </div>

            <p className={styles.cardDesc}>{p.desc}</p>

            <div className={styles.tags}>
              {p.tags.map((t) => (
                <span className={`${styles.tag} ${styles[`tag_${p.color}`]}`} key={t}>
                  {t}
                </span>
              ))}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
