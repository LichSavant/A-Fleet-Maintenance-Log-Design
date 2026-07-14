import { cx } from '../../utils/classNames.js';
import styles from './Input.module.css';

export default function Input({ className, icon: Icon, label, id, ...props }) {
  return (
    <label className={cx(styles.field, className)} htmlFor={id}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={styles.control}>
        {Icon ? <Icon aria-hidden="true" size={18} strokeWidth={1.8} /> : null}
        <input id={id} className={styles.input} {...props} />
      </span>
    </label>
  );
}
