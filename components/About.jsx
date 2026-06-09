'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './About.module.css';

const STACK = ['Power BI', 'DAX', 'SQL', 'Python', 'PowerShell', 'AWS S3', 'Azure Blob', 'Oracle', 'Docker', 'ETL', 'Power Automate', 'ServiceNow'];

const META = [
  { key: 'Location',     val: 'Kolkata, West Bengal, India'          },
  { key: 'Current',      val: 'Senior Analyst @ DXC Technology'      },
  { key: 'Email',        val: 'subhadipchowdhury1998@gmail.com'       },
  { key: 'LinkedIn',     val: 'linkedin.com/in/subho98'              },
  { key: 'Experience',   val: '5+ Years in BI & Automation'          },
  { key: 'Speciality',   val: 'Data Intelligence & ETL'              },
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
        <h2 className="section-title">The Person<br />Behind the <em>Data</em></h2>
      </div>

      <div className={styles.grid}>
        {/* LEFT: photo card */}
        <div className={`${styles.photoCol} reveal`}>
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
                Senior Analyst · DXC Technology
              </div>
            </div>
          </div>

          {/* Tech stack mini tags */}
          <div className={styles.stackWrap}>
            <div className={styles.stackLabel}>// tech_stack</div>
            <div className={styles.stackTags}>
              {STACK.map((s) => (
                <span className="tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: bio + meta */}
        <div className={styles.right}>
          <div className={`${styles.bioBlock} reveal`}>
            <p>
              I&apos;m a <strong>Senior Data Analyst</strong> at DXC Technology with{' '}
              <strong>5+ years</strong> building scalable BI and automation solutions across{' '}
              <strong>banking</strong> and enterprise infrastructure — bridging complex data
              pipelines with clear, actionable intelligence.
            </p>
            <p>
              I specialise in <strong>Power BI</strong>, <strong>DAX</strong>, advanced SQL
              optimisation, and hybrid cloud integrations across{' '}
              <strong>AWS S3</strong>, <strong>Azure Blob</strong>, and{' '}
              <strong>Oracle</strong>. I&apos;ve led deployments that replaced fragmented manual
              workflows with unified operational intelligence platforms.
            </p>
            <p>
              Beyond dashboards — I architect end-to-end{' '}
              <strong>automation frameworks</strong> using PowerShell and Power Automate that
              eliminated <strong>135+ FTEs</strong> of manual effort across security and audit
              processes.
            </p>
          </div>

          {/* Meta table */}
          <div className={`${styles.metaTable} reveal`}>
            {META.map((m) => (
              <div className={styles.metaRow} key={m.key}>
                <span className={styles.metaKey}>{m.key}</span>
                <span className={styles.metaVal}>{m.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
