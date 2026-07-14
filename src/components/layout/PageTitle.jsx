import { useLocation } from 'react-router-dom';
import { getRouteMeta } from '../../data/navigation.js';
import styles from './PageTitle.module.css';

export default function PageTitle() {
  const location = useLocation();
  const meta = getRouteMeta(location.pathname);
  const Icon = meta.icon;

  return (
    <header className={styles.title}>
      <div className={styles.icon}>{Icon ? <Icon size={24} strokeWidth={1.75} /> : null}</div>
      <div>
        <p>ForgeFleet</p>
        <h1>{meta.title}</h1>
        <span>{meta.subtitle}</span>
      </div>
    </header>
  );
}
