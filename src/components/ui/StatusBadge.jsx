import { cx } from '../../utils/classNames.js';
import styles from './StatusBadge.module.css';

const statusClass = {
  ready: styles.success,
  completed: styles.success,
  normal: styles.neutral,
  queued: styles.neutral,
  scheduled: styles.neutral,
  high: styles.warning,
  warning: styles.warning,
  inspection: styles.warning,
  'in service': styles.warning,
  'in progress': styles.warning,
  critical: styles.danger,
  overdue: styles.danger,
  open: styles.danger,
};

export default function StatusBadge({ children, status }) {
  const key = String(status || children).toLowerCase();

  return <span className={cx(styles.badge, statusClass[key] || styles.neutral)}>{children}</span>;
}
