import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getRouteMeta } from '../../data/navigation.js';
import styles from './Breadcrumb.module.css';

export default function Breadcrumb() {
  const location = useLocation();
  const meta = getRouteMeta(location.pathname);
  const isHome = location.pathname === '/dashboard';
  const isVehicleDetails = location.pathname.startsWith('/vehicles/');

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link to="/dashboard" aria-label="Dashboard">
        <Home size={15} strokeWidth={1.8} />
        <span>ForgeFleet</span>
      </Link>
      {!isHome ? (
        <>
          <ChevronRight size={14} strokeWidth={1.8} />
          {isVehicleDetails ? (
            <>
              <Link to="/vehicles">Vehicles</Link>
              <ChevronRight size={14} strokeWidth={1.8} />
            </>
          ) : null}
          <span>{meta.breadcrumb}</span>
        </>
      ) : null}
    </nav>
  );
}
