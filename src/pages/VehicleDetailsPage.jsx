import { ArrowLeft, CalendarClock, Gauge, MapPin, Pencil, Route, UserRound, Wrench } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PageTransition from '../components/animation/PageTransition.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import MetricCard from '../components/ui/MetricCard.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import Table from '../components/ui/Table.jsx';
import { useUI } from '../context/UIContext.jsx';
import {
  vehicleMaintenanceRecords,
  vehicleMileageActivity,
  vehicleReminderRecords,
  vehicles,
} from '../data/fleetData.js';
import { formatNumber } from '../utils/formatters.js';
import styles from './VehicleDetailsPage.module.css';

const maintenanceColumns = [
  { key: 'id', label: 'Record' },
  { key: 'service', label: 'Service' },
  { key: 'completed', label: 'Completed' },
  { key: 'odometer', label: 'Odometer' },
  { key: 'cost', label: 'Cost' },
  { key: 'status', label: 'Status', badge: true },
];

const mileageColumns = [
  { key: 'id', label: 'Log' },
  { key: 'route', label: 'Route' },
  { key: 'driver', label: 'Driver' },
  { key: 'miles', label: 'Miles' },
  { key: 'logged', label: 'Logged' },
  { key: 'status', label: 'Status', badge: true },
];

export default function VehicleDetailsPage() {
  const { vehicleId } = useParams();
  const { handlePlaceholder } = useUI();
  const vehicle = vehicles.find((item) => item.id.toLowerCase() === vehicleId?.toLowerCase());

  if (!vehicle) {
    return (
      <PageTransition>
        <section className={styles.notFound} aria-labelledby="vehicle-not-found-heading">
          <span>Asset unavailable</span>
          <h2 id="vehicle-not-found-heading">Vehicle not found</h2>
          <p>No fleet asset matches “{vehicleId}”. Return to the registry to select an active vehicle.</p>
          <Link className={styles.backLink} to="/vehicles"><ArrowLeft size={18} /> Return to Vehicles</Link>
        </section>
      </PageTransition>
    );
  }

  const maintenance = vehicleMaintenanceRecords.filter((record) => record.vehicleId === vehicle.id);
  const mileage = vehicleMileageActivity.filter((record) => record.vehicleId === vehicle.id);
  const reminders = vehicleReminderRecords.filter((record) => record.vehicleId === vehicle.id);

  return (
    <PageTransition>
      <section className={styles.hero} aria-labelledby="vehicle-name">
        <div className={styles.heroTop}>
          <Link className={styles.backLink} to="/vehicles"><ArrowLeft size={17} /> Vehicle Registry</Link>
          <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
        </div>
        <div className={styles.heroBody}>
          <div>
            <p>{vehicle.id} · {vehicle.year} {vehicle.type}</p>
            <h2 id="vehicle-name">{vehicle.name}</h2>
            <span><MapPin size={17} /> {vehicle.depot}</span>
          </div>
          <Button icon={Pencil} onClick={() => handlePlaceholder(`Edit ${vehicle.id}`)} variant="primary">Edit Vehicle</Button>
        </div>
      </section>

      <section className={styles.metrics} aria-label="Vehicle operating metrics">
        <MetricCard label="Asset Health" value={`${vehicle.health}%`} detail="Current diagnostic score" icon={Gauge} tone={vehicle.health < 70 ? 'warning' : 'success'} />
        <MetricCard label="Odometer" value={formatNumber(vehicle.mileage)} detail="Total recorded miles" icon={Route} tone="neutral" />
        <MetricCard label="Utilization" value={`${vehicle.utilization}%`} detail="Rolling 30-day utilization" icon={Gauge} tone="success" />
        <MetricCard label="Next Service" value={vehicle.nextService} detail="Scheduled service window" icon={CalendarClock} tone={vehicle.nextService === 'Overdue' ? 'warning' : 'neutral'} />
      </section>

      <section className={styles.grid}>
        <Card className={styles.identity} eyebrow="Asset profile" title="Vehicle identity">
          <dl className={styles.details}>
            <div><dt>VIN</dt><dd>{vehicle.vin}</dd></div>
            <div><dt>Fleet ID</dt><dd>{vehicle.id}</dd></div>
            <div><dt>License plate</dt><dd>{vehicle.plate}</dd></div>
            <div><dt>Model year</dt><dd>{vehicle.year}</dd></div>
            <div><dt>Vehicle class</dt><dd>{vehicle.type}</dd></div>
            <div><dt>Home depot</dt><dd>{vehicle.depot}</dd></div>
          </dl>
        </Card>

        <Card className={styles.assignment} eyebrow="Current assignment" title="Driver and operations">
          <div className={styles.driver}>
            <span><UserRound size={25} /></span>
            <div><strong>{vehicle.driver}</strong><p>Primary assigned driver</p></div>
          </div>
          <div className={styles.assignmentMeta}>
            <span><MapPin size={17} /> {vehicle.depot}</span>
            <span><Route size={17} /> Active regional assignment</span>
          </div>
          <Button onClick={() => handlePlaceholder(`Driver assignment for ${vehicle.id}`)} size="sm" variant="secondary">Manage Assignment</Button>
        </Card>

        <Card className={styles.maintenance} eyebrow="Maintenance record" title="Recent service history">
          {maintenance.length ? <Table columns={maintenanceColumns} data={maintenance} /> : <p className={styles.empty}>No maintenance history is recorded for this asset.</p>}
        </Card>

        <Card className={styles.reminders} eyebrow="Service commitments" title="Related reminders">
          <div className={styles.reminderList}>
            {reminders.length ? reminders.map((reminder) => (
              <article key={reminder.id}>
                <span><Wrench size={18} /></span>
                <div><strong>{reminder.title}</strong><p>Due {reminder.due}</p></div>
                <StatusBadge status={reminder.level}>{reminder.level}</StatusBadge>
              </article>
            )) : <p className={styles.empty}>No active reminders for this asset.</p>}
          </div>
        </Card>

        <Card className={styles.mileage} eyebrow="Utilization record" title="Recent mileage activity">
          {mileage.length ? <Table columns={mileageColumns} data={mileage} /> : <p className={styles.empty}>No mileage activity is recorded for this asset.</p>}
        </Card>
      </section>
    </PageTransition>
  );
}
