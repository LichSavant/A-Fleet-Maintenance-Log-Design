import { Gauge, MapPin, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import StatusBadge from './StatusBadge.jsx';
import styles from './VehicleCard.module.css';

export default function VehicleCard({ onAction, vehicle }) {
  return (
    <article className={styles.card}>
      <div className={styles.topline}>
        <StatusBadge status={vehicle.status}>{vehicle.status}</StatusBadge>
        <Button
          aria-label={`Open actions for ${vehicle.id}`}
          icon={MoreHorizontal}
          iconOnly
          onClick={() => onAction(`Actions for ${vehicle.id}`)}
          size="sm"
          variant="ghost"
        >
          More
        </Button>
      </div>
      <h3><Link to={`/vehicles/${vehicle.id}`}>{vehicle.name}</Link></h3>
      <p>{vehicle.type}</p>
      <div className={styles.meta}>
        <span>
          <MapPin size={16} strokeWidth={1.8} />
          {vehicle.depot}
        </span>
        <span>
          <Gauge size={16} strokeWidth={1.8} />
          {vehicle.health}% health
        </span>
      </div>
      <div className={styles.footer}>
        <Link to={`/vehicles/${vehicle.id}`}>{vehicle.id}</Link>
        <strong>Service {vehicle.nextService}</strong>
      </div>
    </article>
  );
}
