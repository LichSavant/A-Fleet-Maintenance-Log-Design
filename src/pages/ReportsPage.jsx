import { Download, SlidersHorizontal } from 'lucide-react';
import PageTransition from '../components/animation/PageTransition.jsx';
import CostDonutChart from '../components/charts/CostDonutChart.jsx';
import FleetHealthChart from '../components/charts/FleetHealthChart.jsx';
import UtilizationChart from '../components/charts/UtilizationChart.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import { useUI } from '../context/UIContext.jsx';
import { reportHighlights } from '../data/fleetData.js';
import styles from './ReportsPage.module.css';

export default function ReportsPage() {
  const { handlePlaceholder } = useUI();

  return (
    <PageTransition>
      <section className={styles.reportHeader}>
        <div>
          <p>Executive intelligence</p>
          <h2>Maintenance economics at fleet scale.</h2>
        </div>
        <div>
          <Button icon={SlidersHorizontal} onClick={() => handlePlaceholder('Report filters')} variant="secondary">
            Configure
          </Button>
          <Button icon={Download} onClick={() => handlePlaceholder('Report download')} variant="primary">
            Download
          </Button>
        </div>
      </section>

      <section className={styles.highlights}>
        {reportHighlights.map((highlight) => (
          <article key={highlight.label}>
            <span>{highlight.label}</span>
            <strong>{highlight.value}</strong>
            <p>{highlight.detail}</p>
          </article>
        ))}
      </section>

      <section className={styles.grid}>
        <Card className={styles.large} eyebrow="Trend model" title="Fleet readiness trend">
          <FleetHealthChart />
        </Card>
        <Card eyebrow="Cost intelligence" title="Spend allocation">
          <CostDonutChart />
        </Card>
        <Card className={styles.large} eyebrow="Operations" title="Depot utilization">
          <UtilizationChart />
        </Card>
        <Card eyebrow="Board summary" title="Key conclusions">
          <div className={styles.conclusions}>
            <article>
              <StatusBadge status="Ready">Stable</StatusBadge>
              <p>Preventive maintenance compliance is keeping readiness above target.</p>
            </article>
            <article>
              <StatusBadge status="High">Watch</StatusBadge>
              <p>Corrective repairs are concentrated in tanker and port assets.</p>
            </article>
            <article>
              <StatusBadge status="Normal">Opportunity</StatusBadge>
              <p>South depot utilization can improve with two preventive slots moved off peak.</p>
            </article>
          </div>
        </Card>
      </section>
    </PageTransition>
  );
}
