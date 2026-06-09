import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.name}>Subhadip Chowdhury</div>
      <div className={styles.copy}>
        © 2025 &nbsp;·&nbsp; Senior Analyst — BI &amp; Automation &nbsp;·&nbsp; Kolkata, India
      </div>
    </footer>
  );
}
