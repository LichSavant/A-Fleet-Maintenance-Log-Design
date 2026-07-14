import styles from './StatCircle.module.css';

export default function StatCircle({ label, value, caption }) {
  const dash = `${Math.max(0, Math.min(value, 100))} 100`;

  return (
    <div className={styles.stat}>
      <svg viewBox="0 0 42 42" aria-hidden="true">
        <circle className={styles.track} cx="21" cy="21" r="15.9155" />
        <circle className={styles.progress} cx="21" cy="21" r="15.9155" strokeDasharray={dash} />
      </svg>
      <strong>{value}%</strong>
      <span>{label}</span>
      {caption ? <p>{caption}</p> : null}
    </div>
  );
}
