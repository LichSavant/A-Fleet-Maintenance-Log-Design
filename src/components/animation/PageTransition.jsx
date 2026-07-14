import { motion } from 'framer-motion';
import styles from './PageTransition.module.css';

export default function PageTransition({ children, className = '' }) {
  return (
    <motion.section
      className={`${styles.page} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
