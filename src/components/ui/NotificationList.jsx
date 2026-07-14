import StatusBadge from './StatusBadge.jsx';
import styles from './NotificationList.module.css';

export default function NotificationList({ items }) {
  return (
    <div className={styles.list}>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article className={styles.item} key={`${item.title}-${item.time}`}>
            <div className={styles.icon}>{Icon ? <Icon size={18} strokeWidth={1.8} /> : null}</div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <time>{item.time}</time>
            </div>
            <StatusBadge status={item.level}>{item.level}</StatusBadge>
          </article>
        );
      })}
    </div>
  );
}
