import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useUI } from '../../context/UIContext.jsx';
import styles from './Notification.module.css';

export default function Notification() {
  const { notification } = useUI();

  return (
    <AnimatePresence>
      {notification ? (
        <motion.div
          className={styles.toast}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          role="status"
        >
          <CheckCircle2 size={18} strokeWidth={1.9} />
          {notification.message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
