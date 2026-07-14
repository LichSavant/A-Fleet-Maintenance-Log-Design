import { BellPlus, CalendarClock, ShieldAlert } from 'lucide-react';
import PageTransition from '../components/animation/PageTransition.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import ReminderCard from '../components/ui/ReminderCard.jsx';
import StatCircle from '../components/ui/StatCircle.jsx';
import StatusBadge from '../components/ui/StatusBadge.jsx';
import { useUI } from '../context/UIContext.jsx';
import { reminders } from '../data/fleetData.js';
import styles from './RemindersPage.module.css';

export default function RemindersPage() {
  const { handlePlaceholder } = useUI();

  return (
    <PageTransition>
      <section className={styles.summary}>
        <Card eyebrow="Compliance" title="Inspection readiness">
          <StatCircle caption="Assets with all inspection commitments current." label="Ready" value={91} />
        </Card>
        <Card eyebrow="Warranty" title="Coverage exposure">
          <div className={styles.panelMetric}>
            <ShieldAlert size={28} strokeWidth={1.7} />
            <strong>$42.6K</strong>
            <span>potential claim value expiring this month</span>
          </div>
        </Card>
        <Card eyebrow="Calendar" title="Upcoming volume">
          <div className={styles.panelMetric}>
            <CalendarClock size={28} strokeWidth={1.7} />
            <strong>38</strong>
            <span>reminders scheduled over the next 14 days</span>
          </div>
        </Card>
      </section>

      <section className={styles.grid}>
        <Card
          action={
            <Button icon={BellPlus} onClick={() => handlePlaceholder('New reminder')} size="sm" variant="primary">
              New Reminder
            </Button>
          }
          className={styles.list}
          eyebrow="Attention required"
          title="Reminder queue"
        >
          {reminders.map((reminder) => (
            <ReminderCard key={`${reminder.title}-${reminder.asset}`} reminder={reminder} />
          ))}
        </Card>

        <Card className={styles.policy} eyebrow="Policy model" title="Reminder rules">
          <div className={styles.rules}>
            <article>
              <span>01</span>
              <div>
                <h3>Critical compliance</h3>
                <p>Escalate to fleet leadership 48 hours before a regulatory deadline.</p>
              </div>
              <StatusBadge status="Ready">Active</StatusBadge>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Warranty preservation</h3>
                <p>Surface eligible repairs before claim windows close.</p>
              </div>
              <StatusBadge status="Ready">Active</StatusBadge>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Driver-reported defects</h3>
                <p>Route defects into maintenance review after supervisor triage.</p>
              </div>
              <StatusBadge status="Inspection">Review</StatusBadge>
            </article>
          </div>
        </Card>
      </section>
    </PageTransition>
  );
}
