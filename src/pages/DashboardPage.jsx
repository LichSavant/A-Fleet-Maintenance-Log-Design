import PageTransition from '../components/animation/PageTransition.jsx';
import { useNavigate } from 'react-router-dom';
import FleetHealthChart from '../components/charts/FleetHealthChart.jsx';
import MonthlyMaintenanceCostChart from '../components/charts/MonthlyMaintenanceCostChart.jsx';
import UtilizationChart from '../components/charts/UtilizationChart.jsx';
import VehicleStatusChart from '../components/charts/VehicleStatusChart.jsx';
import ActivityTimeline from '../components/ui/ActivityTimeline.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import HeroVehicleCard from '../components/ui/HeroVehicleCard.jsx';
import MetricCard from '../components/ui/MetricCard.jsx';
import NotificationList from '../components/ui/NotificationList.jsx';
import QuickActionCard from '../components/ui/QuickActionCard.jsx';
import ReminderCard from '../components/ui/ReminderCard.jsx';
import Table from '../components/ui/Table.jsx';
import { useUI } from '../context/UIContext.jsx';
import {
  activities,
  dashboardHeroVehicle,
  fleetStats,
  latestNotifications,
  metrics,
  mileageLogs,
  quickActions,
  reminders,
} from '../data/fleetData.js';
import styles from './DashboardPage.module.css';

const mileageColumns = [
  { key: 'id', label: 'Log' },
  { key: 'asset', label: 'Asset' },
  { key: 'driver', label: 'Driver' },
  { key: 'route', label: 'Route' },
  { key: 'miles', label: 'Miles' },
  { key: 'logged', label: 'Logged' },
  { key: 'status', label: 'Status', badge: true },
];

export default function DashboardPage() {
  const { handlePlaceholder } = useUI();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <section className={styles.heroGrid}>
        <HeroVehicleCard onView={(vehicleId) => navigate(`/vehicles/${vehicleId}`)} vehicle={dashboardHeroVehicle} />
        <Card className={styles.healthPanel} eyebrow="Fleet health overview" title="Readiness trend">
          <FleetHealthChart />
        </Card>
      </section>

      <section className={styles.metrics} aria-label="Fleet health overview metrics">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className={styles.grid}>
        <Card className={styles.actions} eyebrow="Operations" title="Quick actions">
          <div className={styles.actionGrid}>
            {quickActions.map((action) => (
              <QuickActionCard action={action} key={action.label} onSelect={handlePlaceholder} />
            ))}
          </div>
        </Card>

        <Card className={styles.reminders} eyebrow="Upcoming service reminders" title="Service commitments">
          <div className={styles.reminderList}>
            {reminders.map((reminder) => (
              <ReminderCard key={`${reminder.title}-${reminder.asset}`} reminder={reminder} />
            ))}
          </div>
        </Card>

        <Card className={styles.activity} eyebrow="Recent maintenance activity" title="Activity timeline">
          <ActivityTimeline items={activities} />
        </Card>

        <section className={styles.statsSection} aria-labelledby="fleet-statistics-heading">
          <div className={styles.sectionHeader}>
            <p>Fleet statistics</p>
            <h2 id="fleet-statistics-heading">Operating signals</h2>
          </div>
          <div className={styles.statsGrid}>
            {fleetStats.map((stat) => (
              <MetricCard key={stat.label} {...stat} />
            ))}
          </div>
        </section>

        <Card
          action={
            <Button onClick={() => handlePlaceholder('Mileage logs')} size="sm" variant="ghost">
              View All
            </Button>
          }
          className={styles.mileage}
          eyebrow="Recent mileage logs"
          title="Mileage capture"
        >
          <Table columns={mileageColumns} data={mileageLogs} />
        </Card>

        <Card className={styles.status} eyebrow="Vehicle status distribution" title="Fleet state">
          <VehicleStatusChart />
        </Card>

        <Card className={styles.cost} eyebrow="Monthly maintenance cost" title="Cost trend">
          <MonthlyMaintenanceCostChart />
        </Card>

        <Card className={styles.utilization} eyebrow="Vehicle utilization" title="Utilization by depot">
          <UtilizationChart />
        </Card>

        <Card className={styles.notifications} eyebrow="Latest notifications" title="Operations alerts">
          <NotificationList items={latestNotifications} />
        </Card>
      </section>
    </PageTransition>
  );
}
