import styles from "./AppLayout.module.css";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";
import { useCities } from "../contexts/CitiesContext";
export default function AppLayout() {
  const { loading, error } = useCities();
  return (
    <div className={styles.appLayout}>
      <SideBar />

      {loading ? <Loader /> : error ? <Error /> : <Map />}
      <User />
      <footer className={styles.footer}>
        <p>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
      </footer>
    </div>
  );
}
