import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import styles from './App.module.css';

const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const MaintenancePage = lazy(() => import('./pages/MaintenancePage.jsx'));
const RemindersPage = lazy(() => import('./pages/RemindersPage.jsx'));
const ReportsPage = lazy(() => import('./pages/ReportsPage.jsx'));
const ShellPlaceholderPage = lazy(() => import('./pages/ShellPlaceholderPage.jsx'));
const VehiclesPage = lazy(() => import('./pages/VehiclesPage.jsx'));
const VehicleDetailsPage = lazy(() => import('./pages/VehicleDetailsPage.jsx'));

export default function App() {
  return (
    <Suspense fallback={<div className={styles.loader}>Loading ForgeFleet</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:vehicleId" element={<VehicleDetailsPage />} />
          <Route path="/drivers" element={<ShellPlaceholderPage />} />
          <Route path="/mileage-logs" element={<ShellPlaceholderPage />} />
          <Route path="/service-types" element={<ShellPlaceholderPage />} />
          <Route path="/maintenance" element={<Navigate to="/maintenance-history" replace />} />
          <Route path="/maintenance-history" element={<MaintenancePage />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/users" element={<ShellPlaceholderPage />} />
          <Route path="/settings" element={<ShellPlaceholderPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}
