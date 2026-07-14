import styles from './Avatar.module.css';

export default function Avatar({ name = 'ForgeFleet Control' }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');

  return (
    <div className={styles.avatar} aria-label={name}>
      {initials}
    </div>
  );
}
