import styles from './ChartTooltip.module.css';

export default function ChartTooltip({ active, label, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className={styles.tooltip}>
      <strong>{label}</strong>
      {payload.map((entry) => (
        <span key={entry.dataKey}>
          {entry.name || entry.dataKey}: {entry.value}
        </span>
      ))}
    </div>
  );
}
