import { cx } from '../../utils/classNames.js';
import styles from './Card.module.css';

export default function Card({ action, children, className, eyebrow, title }) {
  return (
    <section className={cx(styles.card, className)}>
      {title || eyebrow || action ? (
        <div className={styles.header}>
          <div>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            {title ? <h2 className={styles.title}>{title}</h2> : null}
          </div>
          {action ? <div className={styles.action}>{action}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
