import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.name}>Subhadip Chowdhury</div>
      <div className={styles.copy}>
        © 2026 &nbsp;·&nbsp; AI Solutions Engineer — Agentic AI, BI &amp; Enterprise Automation &nbsp;·&nbsp; Kolkata, India
      </div>
    </footer>
  );
}
