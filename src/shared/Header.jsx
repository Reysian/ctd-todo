import { NavLink } from 'react-router';
import styles from './Header.module.css';

function Header({ title }) {
  return (
    <div className={styles.header}>
      <p className={styles.invisible}></p>
      <h1>{title}</h1>
      <nav>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Home
        </NavLink>
        <NavLink
          to={'/about'}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          About
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
