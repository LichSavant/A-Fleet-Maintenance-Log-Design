import { ChevronDown, LogOut, ShieldCheck, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useUI } from '../../context/UIContext.jsx';
import Avatar from '../ui/Avatar.jsx';
import styles from './ProfileDropdown.module.css';

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { handlePlaceholder } = useUI();

  useEffect(() => {
    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <div className={styles.profile} ref={menuRef}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className={styles.trigger}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <Avatar name="Fleet Director" />
        <span>
          <strong>Fleet Director</strong>
          <small>Operations Lead</small>
        </span>
        <ChevronDown size={16} strokeWidth={1.9} />
      </button>

      {open ? (
        <div className={styles.menu} role="menu">
          <button onClick={() => handlePlaceholder('Profile')} role="menuitem" type="button">
            <UserRound size={17} strokeWidth={1.8} />
            Profile
          </button>
          <button onClick={() => handlePlaceholder('Access controls')} role="menuitem" type="button">
            <ShieldCheck size={17} strokeWidth={1.8} />
            Access Controls
          </button>
          <button onClick={() => handlePlaceholder('Sign out')} role="menuitem" type="button">
            <LogOut size={17} strokeWidth={1.8} />
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
}
