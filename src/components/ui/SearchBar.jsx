import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar({ placeholder = 'Search fleet, assets, work orders' }) {
  return (
    <label className={styles.search}>
      <Search aria-hidden="true" size={18} strokeWidth={1.8} />
      <input placeholder={placeholder} type="search" />
    </label>
  );
}
