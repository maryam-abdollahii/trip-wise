import AppNav from "./AppNav";
import styles from "./SideBar.module.css";
import { Link, Outlet } from "react-router-dom";
export default function SideBar() {
  return (
    <aside className={styles.sideBar}>
      <Link to="/">
        <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
      </Link>
      <AppNav />
      <Outlet/>
    </aside>
  );
}
