import { CalendarPlus, ClipboardList, TimerReset, Wrench } from 'lucide-react';
import PageTransition from '../components/animation/PageTransition.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import MetricCard from '../components/ui/MetricCard.jsx';
import StatCircle from '../components/ui/StatCircle.jsx';
import Table from '../components/ui/Table.jsx';
import { useUI } from '../context/UIContext.jsx';
import { workOrders } from '../data/fleetData.js';
import styles from './MaintenancePage.module.css';

const queueMetrics = [
  {
    label: 'Scheduled Today',
    value: '18',
    delta: '4 completed',
    tone: 'neutral',
    icon: CalendarPlus,
  },
  {
    label: 'Avg Repair Time',
    value: '5.8h',
    delta: '-1.1h target',
    tone: 'success',
    icon: TimerReset,
  },
  {
    label: 'Critical Holds',
    value: '6',
    delta: '2 awaiting parts',
    tone: 'warning',
    icon: Wrench,
  },
];

const columns = [
  { key: 'id', label: 'Order' },
  { key: 'asset', label: 'Asset' },
  { key: 'task', label: 'Service Task' },
  { key: 'priority', label: 'Priority', badge: true },
  { key: 'owner', label: 'Technician' },
  { key: 'due', label: 'Due' },
  { key: 'status', label: 'Status', badge: true },
];

export default function MaintenancePage() {
  const { handlePlaceholder } = useUI();

  return (
    <PageTransition>
      <section className={styles.headerBand}>
        <div>
          <p>Maintenance cadence</p>
          <h2>Service planning without operational drag.</h2>
        </div>
        <Button icon={ClipboardList} onClick={() => handlePlaceholder('Work order builder')} variant="primary">
          Build Work Order
        </Button>
      </section>

      <section className={styles.metricRow}>
        {queueMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className={styles.grid}>
        <Card className={styles.score} eyebrow="Program health" title="Preventive compliance">
          <StatCircle caption="Inspections and preventive tasks completed inside the service window." label="Compliance" value={97} />
        </Card>

        <Card
          action={
            <Button onClick={() => handlePlaceholder('Queue optimization')} size="sm" variant="secondary">
              Optimize
            </Button>
          }
          className={styles.queue}
          eyebrow="Service queue"
          title="Work order control"
        >
          <Table columns={columns} data={workOrders} />
        </Card>
      </section>
    </PageTransition>
  );
}
