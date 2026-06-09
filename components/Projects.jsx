'use client';
import { useEffect, useRef } from 'react';
import styles from './Projects.module.css';

const PROJECTS = [
  {
    num: '01',
    color: 'cyan',
    featured: true,
    name: 'DORM – Centralized Operations Dashboard',
    role: 'Senior Data Analyst',
    impact: [
      { val: '100+', label: 'Customers Served' },
      { val: '200+', label: 'In Pipeline'      },
      { val: '4',    label: 'ITSM Streams'     },
    ],
    desc: 'Consolidated Incidents, Problems, Service Requests, and Changes into a unified Power BI operational platform. Replaced fragmented email-based reporting across all business units — now the single source of truth for operational health.',
    tags: ['Power BI', 'DAX', 'SQL', 'ServiceNow', 'SharePoint', 'Power Automate'],
    icon: '📊',
  },
  {
    num: '02',
    color: 'green',
    featured: false,
    name: 'Intelligent Operations Dashboard Suite',
    role: 'Senior Data Analyst',
    impact: [
      { val: '35%',  label: 'Faster Reporting' },
      { val: 'SLA',  label: 'Monitoring'        },
    ],
    desc: 'Enterprise-wide suite covering Incident, Service, Risk, Security, Application, and Infrastructure. KPI dashboards for SLA compliance, MTTR, and CPU/Memory utilization.',
    tags: ['Power BI', 'Azure Data Lake', 'DAX', 'ServiceNow', 'Power Automate'],
    icon: '🏗️',
  },
  {
    num: '03',
    color: 'purple',
    featured: false,
    name: 'Automated Security Compliance Monitoring',
    role: 'Automation Engineer / BI Dev',
    impact: [
      { val: '~90',   label: 'FTEs Saved'   },
      { val: '2000+', label: 'Systems'       },
    ],
    desc: 'Secure PowerShell framework automating daily config and access-control validation across 2000+ enterprise systems. Centralized Power BI compliance monitoring dashboard.',
    tags: ['PowerShell', 'Windows Server', 'Power BI', 'Task Scheduler'],
    icon: '🔒',
  },
  {
    num: '04',
    color: 'amber',
    featured: false,
    name: 'Business Transactions & Refund Governance',
    role: 'Automation Engineer / BI Dev',
    impact: [
      { val: '80+', label: 'Databases'       },
      { val: '90+', label: 'Global Branches' },
    ],
    desc: 'Refund eligibility dashboard with real-time exception detection. Integrated 80+ databases tracking workload, profitability, turnaround time, and audit compliance.',
    tags: ['Power BI', 'SQL', 'DAX'],
    icon: '💳',
  },
  {
    num: '05',
    color: 'cyan',
    featured: false,
    name: 'Unauthorized Software Remediation',
    role: 'Automation Engineer',
    impact: [
      { val: '20K+', label: 'Endpoints' },
      { val: '~45',  label: 'FTEs Saved'},
    ],
    desc: 'PowerShell framework monitoring enterprise endpoints via centralized jump host. Auto-collected software inventory and remotely uninstalled unauthorized applications.',
    tags: ['PowerShell', 'Microsoft Intune', 'Windows Endpoint'],
    icon: '⚙️',
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
  const rest     = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className={styles.section} ref={ref}>
      <div className="reveal">
        <div className="section-label">03 / Projects</div>
        <h2 className="section-title">
          Key <em>Projects</em> &amp; Impact
        </h2>
      </div>

      <div className={styles.bento}>
        {/* ── FEATURED CARD (wide) ── */}
        <div className={`${styles.featCard} ${styles[`feat_${featured.color}`]} reveal`}>
          {/* Background glow */}
          <div className={`${styles.featGlow} ${styles[`glow_${featured.color}`]}`} />

          {/* Top row */}
          <div className={styles.featTop}>
            <div className={`${styles.featIcon} ${styles[`iconBg_${featured.color}`]}`}>
              {featured.icon}
            </div>
            <div className={styles.featBadge}>Featured Project</div>
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
        </div>

        {/* ── REGULAR CARDS ── */}
        {rest.map((p) => (
          <div
            className={`${styles.card} ${styles[`card_${p.color}`]} reveal`}
            key={p.num}
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
                <span className={`${styles.tag} ${styles[`tag_${p.color}`]}`} key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
