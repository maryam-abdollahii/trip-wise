import styles from "./PageNav.module.css";
import buttonStyles  from "./Button.module.css"
import { Link, NavLink } from "react-router-dom";
export default function PageNav() {
  return (
    <nav className={styles.nav}>
      
      <Link to="/">
        <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
      </Link>
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={buttonStyles.button}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
