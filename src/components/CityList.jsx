import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import { useCities } from "../contexts/CitiesContext";
export default function CityList() {
  const { cities } = useCities();
  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </div>
  );
}
