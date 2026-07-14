import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cx } from '../../utils/classNames.js';
import styles from './MetricCard.module.css';

export default function MetricCard({ delta, icon: Icon, label, tone = 'neutral', value }) {
  return (
    <motion.article
      className={cx(styles.metric, styles[tone])}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      <div className={styles.iconWrap}>{Icon ? <Icon size={21} strokeWidth={1.8} /> : null}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>
          <ArrowUpRight size={14} strokeWidth={2} />
          {delta}
        </span>
      </div>
    </motion.article>
  );
}
