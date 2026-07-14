import {
  ChevronLeft,
  Gauge,
  ShieldCheck,
} from 'lucide-react';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUI } from '../../context/UIContext.jsx';
import { navItems } from '../../data/navigation.js';
import Button from '../ui/Button.jsx';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const location = useLocation();
  const { closeMobileNav, mobileNavOpen, sidebarCollapsed, toggleSidebar } = useUI();

  useEffect(() => {
    closeMobileNav();
  }, [closeMobileNav, location.pathname]);

  return (
    <aside
      className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''} ${
        mobileNavOpen ? styles.open : ''
      }`}
    >
      <div className={styles.brand}>
        <span className={styles.mark}>
          <ShieldCheck size={24} strokeWidth={1.7} />
        </span>
        <div className={styles.brandText}>
          <strong>ForgeFleet</strong>
          <small>Maintenance OS</small>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              key={item.to}
              onClick={closeMobileNav}
              to={item.to}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon size={20} strokeWidth={1.8} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className={styles.system}>
        <div className={styles.health}>
          <Gauge size={18} strokeWidth={1.8} />
          <div>
            <strong>94%</strong>
            <span>Fleet readiness</span>
          </div>
        </div>
        <Button
          icon={ChevronLeft}
          iconOnly={sidebarCollapsed}
          onClick={toggleSidebar}
          size="sm"
          variant="secondary"
        >
          {sidebarCollapsed ? 'Expand navigation' : 'Collapse'}
        </Button>
      </div>
    </aside>
  );
}
