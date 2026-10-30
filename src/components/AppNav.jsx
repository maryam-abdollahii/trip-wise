import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";
export default function AppNav() {
  return <nav className={styles.appNav}>
    <NavLink to="cities">cities</NavLink>
    <NavLink to="countries">countries</NavLink>
  </nav>;
}
