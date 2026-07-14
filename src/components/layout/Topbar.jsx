import { Bell, Menu, Plus } from 'lucide-react';
import { useUI } from '../../context/UIContext.jsx';
import Button from '../ui/Button.jsx';
import SearchBar from '../ui/SearchBar.jsx';
import ProfileDropdown from './ProfileDropdown.jsx';
import styles from './Topbar.module.css';

export default function Topbar() {
  const { handlePlaceholder, openMobileNav, toggleSidebar } = useUI();

  function handleMenuClick() {
    if (window.matchMedia('(max-width: 760px)').matches) {
      openMobileNav();
      return;
    }

    toggleSidebar();
  }

  return (
    <header className={styles.topbar}>
      <Button icon={Menu} iconOnly onClick={handleMenuClick} variant="ghost">
        Toggle navigation
      </Button>

      <div className={styles.controls}>
        <SearchBar />
        <Button icon={Plus} onClick={() => handlePlaceholder('New maintenance action')} variant="primary">
          New Action
        </Button>
        <Button
          icon={Bell}
          iconOnly
          onClick={() => handlePlaceholder('Notifications')}
          variant="secondary"
        >
          Notifications
        </Button>
        <ProfileDropdown />
      </div>
    </header>
  );
}
