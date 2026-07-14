import { Outlet } from 'react-router-dom';
import Breadcrumb from './Breadcrumb.jsx';
import PageTitle from './PageTitle.jsx';
import styles from './PageContainer.module.css';

export default function PageContainer() {
  return (
    <main className={styles.container}>
      <div className={styles.chrome}>
        <Breadcrumb />
        <PageTitle />
      </div>
      <Outlet />
    </main>
  );
}
