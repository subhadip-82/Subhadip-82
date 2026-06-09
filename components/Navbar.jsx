'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const LINKS = [
  { href: '#about',        label: 'About'        },
  { href: '#experience',   label: 'Experience'   },
  { href: '#projects',     label: 'Projects'     },
  { href: '#skills',       label: 'Skills'       },
  { href: '#education',    label: 'Education'    },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact',      label: 'Contact'      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('');
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
      const current  = sections.find((s) => s.getBoundingClientRect().top <= 120);
      if (current) setActive('#' + current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#hero" className={styles.logo} onClick={(e) => go(e, '#hero')}>
          <span className={styles.logoBracket}>[</span>
          SC
          <span className={styles.logoBracket}>]</span>
        </a>

        <ul className={styles.links}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`${styles.link} ${active === l.href ? styles.linkActive : ''}`}
                onClick={(e) => go(e, l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="/Resume.pdf" download="Subhadip_Chowdhury_CV.pdf" className={styles.downloadBtn}>
          ↓ Download CV
        </a>
        <a href="#contact" className={styles.navCta} onClick={(e) => go(e, '#contact')}>
          Hire Me
        </a>

        <button
          className={`${styles.ham} ${open ? styles.hamOpen : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}>
        <button className={styles.mobileClose} onClick={() => setOpen(false)}>✕</button>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className={styles.mobileLink}>
            {l.label}
          </a>
        ))}
        <a href="/Resume.pdf" download="Subhadip_Chowdhury_CV.pdf" className={styles.mobileDownload}>
          ↓ Download CV
        </a>
        <a href="#contact" className="btn-primary" onClick={(e) => go(e, '#contact')}
          style={{ marginTop: '0.5rem' }}>
          Hire Me
        </a>
      </div>
    </>
  );
}
