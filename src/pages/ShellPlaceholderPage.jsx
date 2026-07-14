import { Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PageTransition from '../components/animation/PageTransition.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import Table from '../components/ui/Table.jsx';
import { useUI } from '../context/UIContext.jsx';
import { getRouteMeta } from '../data/navigation.js';
import styles from './ShellPlaceholderPage.module.css';

const pageData = {
  '/drivers': {
    action: 'Add Driver',
    eyebrow: 'Personnel',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Driver' },
      { key: 'homeBase', label: 'Home Base' },
      { key: 'certification', label: 'Certification' },
      { key: 'status', label: 'Status', badge: true },
    ],
    rows: [
      { id: 'DR-104', name: 'M. Ellis', homeBase: 'North Yard', certification: 'Class A', status: 'Ready' },
      { id: 'DR-221', name: 'A. Novak', homeBase: 'Central Hub', certification: 'Hazmat', status: 'In Service' },
      { id: 'DR-318', name: 'S. Kim', homeBase: 'Port Terminal', certification: 'Class A', status: 'Inspection' },
    ],
  },
  '/mileage-logs': {
    action: 'Log Mileage',
    eyebrow: 'Mileage',
    columns: [
      { key: 'id', label: 'Log' },
      { key: 'asset', label: 'Asset' },
      { key: 'route', label: 'Route' },
      { key: 'miles', label: 'Miles' },
      { key: 'status', label: 'Status', badge: true },
    ],
    rows: [
      { id: 'ML-6021', asset: 'FF-2048', route: 'North - Central', miles: '486', status: 'Completed' },
      { id: 'ML-6018', asset: 'FF-1182', route: 'Central - South', miles: '214', status: 'Ready' },
      { id: 'ML-6009', asset: 'FF-0631', route: 'West Service Loop', miles: '128', status: 'Scheduled' },
    ],
  },
  '/service-types': {
    action: 'New Service Type',
    eyebrow: 'Programs',
    columns: [
      { key: 'id', label: 'Code' },
      { key: 'name', label: 'Service Type' },
      { key: 'interval', label: 'Interval' },
      { key: 'labor', label: 'Labor' },
      { key: 'status', label: 'Status', badge: true },
    ],
    rows: [
      { id: 'PM-A', name: 'Preventive Inspection A', interval: '10,000 mi', labor: '2.4h', status: 'Ready' },
      { id: 'BRK', name: 'Brake System Service', interval: '30,000 mi', labor: '4.8h', status: 'Ready' },
      { id: 'DOT', name: 'DOT Compliance Review', interval: 'Annual', labor: '3.2h', status: 'Scheduled' },
    ],
  },
  '/users': {
    action: 'Invite User',
    eyebrow: 'Access',
    columns: [
      { key: 'id', label: 'User' },
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'lastActive', label: 'Last Active' },
      { key: 'status', label: 'Status', badge: true },
    ],
    rows: [
      { id: 'US-001', name: 'Fleet Director', role: 'Administrator', lastActive: 'Now', status: 'Ready' },
      { id: 'US-014', name: 'Depot Manager', role: 'Manager', lastActive: '18 min ago', status: 'Ready' },
      { id: 'US-022', name: 'Service Advisor', role: 'Technician', lastActive: '1 hr ago', status: 'In Service' },
    ],
  },
  '/settings': {
    action: 'Save Settings',
    eyebrow: 'Workspace',
    columns: [
      { key: 'id', label: 'Setting' },
      { key: 'name', label: 'Name' },
      { key: 'scope', label: 'Scope' },
      { key: 'owner', label: 'Owner' },
      { key: 'status', label: 'Status', badge: true },
    ],
    rows: [
      { id: 'SET-01', name: 'Preventive thresholds', scope: 'Fleet-wide', owner: 'Operations', status: 'Ready' },
      { id: 'SET-02', name: 'Notification policy', scope: 'Leadership', owner: 'Admin', status: 'Ready' },
      { id: 'SET-03', name: 'Depot service windows', scope: 'Regional', owner: 'Dispatch', status: 'Scheduled' },
    ],
  },
};

export default function ShellPlaceholderPage() {
  const location = useLocation();
  const { handlePlaceholder } = useUI();
  const meta = getRouteMeta(location.pathname);
  const content = pageData[location.pathname] || pageData['/drivers'];

  return (
    <PageTransition>
      <section className={styles.summary}>
        <article>
          <span>{content.eyebrow}</span>
          <strong>3</strong>
          <p>active records currently shown in this frontend view.</p>
        </article>
        <article>
          <span>Readiness</span>
          <strong>94%</strong>
          <p>aligned with the global ForgeFleet operating model.</p>
        </article>
        <article>
          <span>Status</span>
          <StatusBadge status="Ready">Ready</StatusBadge>
          <p>placeholder actions are wired for future product logic.</p>
        </article>
      </section>

      <Card
        action={
          <Button icon={Plus} onClick={() => handlePlaceholder(content.action)} size="sm" variant="primary">
            {content.action}
          </Button>
        }
        eyebrow={content.eyebrow}
        title={meta.title}
      >
        <Table columns={content.columns} data={content.rows} />
      </Card>
    </PageTransition>
  );
}
