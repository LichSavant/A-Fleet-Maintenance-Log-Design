import { useUI } from '../../context/UIContext.jsx';
import Notification from '../ui/Notification.jsx';
import PageContainer from './PageContainer.jsx';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import styles from './AppShell.module.css';

export default function AppShell() {
  const { closeMobileNav, mobileNavOpen, sidebarCollapsed } = useUI();

  return (
    <div className={`${styles.shell} ${sidebarCollapsed ? styles.collapsed : ''}`}>
      <button
        aria-label="Close navigation"
        className={`${styles.scrim} ${mobileNavOpen ? styles.scrimVisible : ''}`}
        onClick={closeMobileNav}
        type="button"
      />
      <Sidebar />
      <div className={styles.workspace}>
        <Topbar />
        <PageContainer />
      </div>
      <Notification />
    </div>
  );
}
