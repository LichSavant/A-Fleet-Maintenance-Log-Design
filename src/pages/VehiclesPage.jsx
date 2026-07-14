import { Download, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/animation/PageTransition.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Table from '../components/ui/Table.jsx';
import VehicleCard from '../components/ui/VehicleCard.jsx';
import { useUI } from '../context/UIContext.jsx';
import { vehicles } from '../data/fleetData.js';
import { formatNumber } from '../utils/formatters.js';
import styles from './VehiclesPage.module.css';

const columns = [
  { key: 'id', label: 'Asset' },
  { key: 'name', label: 'Name', render: (row) => <Link to={`/vehicles/${row.id}`}>{row.name}</Link> },
  { key: 'type', label: 'Type' },
  { key: 'depot', label: 'Depot' },
  { key: 'mileage', label: 'Mileage', render: (row) => `${formatNumber(row.mileage)} mi` },
  { key: 'health', label: 'Health', render: (row) => `${row.health}%` },
  { key: 'nextService', label: 'Next Service' },
  { key: 'status', label: 'Status', badge: true },
];

export default function VehiclesPage() {
  const { handlePlaceholder } = useUI();

  return (
    <PageTransition>
      <section className={styles.toolbar}>
        <Input icon={Search} id="vehicle-search" placeholder="Search by unit, VIN, depot" type="search" />
        <div>
          <Button icon={Filter} onClick={() => handlePlaceholder('Vehicle filters')} variant="secondary">
            Filters
          </Button>
          <Button icon={Download} onClick={() => handlePlaceholder('Vehicle export')} variant="ghost">
            Export
          </Button>
        </div>
      </section>

      <section className={styles.vehicleGrid}>
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} onAction={handlePlaceholder} vehicle={vehicle} />
        ))}
      </section>

      <Card
        action={
          <Button onClick={() => handlePlaceholder('Add vehicle')} size="sm" variant="primary">
            Add Vehicle
          </Button>
        }
        eyebrow="Registry"
        title="Fleet assets"
      >
        <Table columns={columns} data={vehicles} />
      </Card>
    </PageTransition>
  );
}
