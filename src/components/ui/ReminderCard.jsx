import StatusBadge from './StatusBadge.jsx';
import styles from './ReminderCard.module.css';

export default function ReminderCard({ reminder }) {
  const Icon = reminder.icon;

  return (
    <article className={styles.reminder}>
      <div className={styles.icon}>{Icon ? <Icon size={20} strokeWidth={1.8} /> : null}</div>
      <div>
        <h3>{reminder.title}</h3>
        <p>{reminder.asset}</p>
      </div>
      <div className={styles.due}>
        <span>{reminder.due}</span>
        <StatusBadge status={reminder.level}>{reminder.level}</StatusBadge>
      </div>
    </article>
  );
}
