import { Activity, Gauge, MapPin, UserRound } from 'lucide-react';
import heroImage from '../../assets/forgefleet-hero.png';
import { formatNumber } from '../../utils/formatters.js';
import Button from './Button.jsx';
import StatusBadge from './StatusBadge.jsx';
import styles from './HeroVehicleCard.module.css';

export default function HeroVehicleCard({ onView, vehicle }) {
  return (
    <article className={styles.heroCard}>
      <img alt="" aria-hidden="true" src={heroImage} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.topline}>
          <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
          <span>{vehicle.id}</span>
        </div>

        <div className={styles.copy}>
          <p>Hero vehicle</p>
          <h2>{vehicle.name}</h2>
          <span>{vehicle.type}</span>
        </div>

        <dl className={styles.stats}>
          <div>
            <dt>
              <Gauge size={16} strokeWidth={1.8} />
              Health
            </dt>
            <dd>{vehicle.health}%</dd>
          </div>
          <div>
            <dt>
              <Activity size={16} strokeWidth={1.8} />
              Utilization
            </dt>
            <dd>{vehicle.utilization}%</dd>
          </div>
          <div>
            <dt>
              <MapPin size={16} strokeWidth={1.8} />
              Mileage
            </dt>
            <dd>{formatNumber(vehicle.mileage)}</dd>
          </div>
        </dl>

        <div className={styles.footer}>
          <div>
            <span>
              <UserRound size={15} strokeWidth={1.8} />
              {vehicle.driver}
            </span>
            <strong>{vehicle.route}</strong>
          </div>
          <Button onClick={() => onView(vehicle.id)} size="sm" variant="primary">
            View Asset
          </Button>
        </div>
      </div>
    </article>
  );
}
