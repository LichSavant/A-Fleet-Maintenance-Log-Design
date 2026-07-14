import styles from './ActivityTimeline.module.css';

export default function ActivityTimeline({ items }) {
  return (
    <ol className={styles.timeline}>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <li key={`${item.title}-${item.time}`}>
            <div className={styles.marker}>{Icon ? <Icon size={18} strokeWidth={1.8} /> : null}</div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
            <time>{item.time}</time>
          </li>
        );
      })}
    </ol>
  );
}
