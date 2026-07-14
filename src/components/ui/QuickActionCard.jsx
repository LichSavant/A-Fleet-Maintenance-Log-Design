import styles from './QuickActionCard.module.css';

export default function QuickActionCard({ action, onSelect }) {
  const Icon = action.icon;

  return (
    <button className={styles.action} type="button" onClick={() => onSelect(action.label)}>
      <span>{Icon ? <Icon size={22} strokeWidth={1.8} /> : null}</span>
      {action.label}
    </button>
  );
}
