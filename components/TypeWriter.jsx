'use client';
import { useState, useEffect } from 'react';
import styles from './TypeWriter.module.css';

const ROLES = [
  'BI Developer',
  'Data Analyst',
  'ETL Automation Engineer',
  'Cloud Analytics Specialist',
  'Data Intelligence Lead',
  'Power BI Expert',
];

export default function TypeWriter() {
  const [idx, setIdx]           = useState(0);
  const [text, setText]         = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[idx];
    let t;
    if (!deleting && text.length < role.length) {
      t = setTimeout(() => setText(role.slice(0, text.length + 1)), 75);
    } else if (!deleting && text.length === role.length) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 38);
    } else {
      setDeleting(false);
      setIdx((idx + 1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <span className={styles.wrapper}>
      <span className={styles.text}>{text}</span>
      <span className={styles.cursor} />
    </span>
  );
}
