import { cx } from '../../utils/classNames.js';
import styles from './Button.module.css';

export default function Button({
  children,
  className,
  icon: Icon,
  iconOnly = false,
  size = 'md',
  variant = 'primary',
  ...props
}) {
  return (
    <button
      className={cx(
        styles.button,
        styles[variant],
        styles[size],
        iconOnly && styles.iconOnly,
        className,
      )}
      type="button"
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" size={18} strokeWidth={1.8} /> : null}
      {iconOnly ? <span className={styles.srOnly}>{children}</span> : children}
    </button>
  );
}
