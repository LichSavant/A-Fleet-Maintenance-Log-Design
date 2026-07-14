import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import heroImage from '../assets/forgefleet-hero.png';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { useUI } from '../context/UIContext.jsx';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { handlePlaceholder } = useUI();

  return (
    <main className={styles.login}>
      <section className={styles.heroPane} aria-label="ForgeFleet brand introduction">
        <img alt="Premium fleet maintenance bay with a commercial truck" src={heroImage} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.logoLockup}>
            <span>
              <ShieldCheck size={34} strokeWidth={1.7} />
            </span>
            <div>
              <strong>ForgeFleet</strong>
              <small>Precision maintenance command</small>
            </div>
          </div>
          <div className={styles.heroCopy}>
            <p>Industrial intelligence, tuned for premium fleets.</p>
            <h1>Keep every asset road-ready with executive-grade visibility.</h1>
          </div>
          <dl className={styles.heroStats}>
            <div>
              <dt>94%</dt>
              <dd>Readiness</dd>
            </div>
            <div>
              <dt>128</dt>
              <dd>Assets</dd>
            </div>
            <div>
              <dt>24/7</dt>
              <dd>Control</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.formPane} aria-label="Sign in to ForgeFleet">
        <div className={styles.card}>
          <div className={styles.formHeader}>
            <span>Secure Access</span>
            <h2>Welcome back</h2>
            <p>Sign in to the ForgeFleet command environment.</p>
          </div>

          <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
            <Input
              autoComplete="email"
              icon={Mail}
              id="email"
              label="Email"
              placeholder="fleet.director@forgefleet.com"
              type="email"
            />
            <Input
              autoComplete="current-password"
              icon={LockKeyhole}
              id="password"
              label="Password"
              placeholder="Enter password"
              type="password"
            />

            <div className={styles.formMeta}>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" onClick={() => handlePlaceholder('Password reset')}>
                Forgot password?
              </button>
            </div>

            <Button onClick={() => handlePlaceholder('Sign in')} size="lg" variant="primary">
              Sign In
            </Button>
            <Button onClick={() => handlePlaceholder('Google sign in')} size="lg" variant="secondary">
              <span className={styles.googleMark}>G</span>
              Continue with Google
            </Button>
          </form>

          <p className={styles.admin}>
            Need access? <button onClick={() => handlePlaceholder('Contact administrator')} type="button">Contact administrator</button>
          </p>
          <footer>ForgeFleet Control Suite 2026</footer>
        </div>
      </section>
    </main>
  );
}
