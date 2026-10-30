import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import countryCodes from "../utils/countryCodes";
import { useCities } from "../contexts/CitiesContext";
export default function CityItem({ city }) {
  const { cityName, country, date, position, id } = city;
  const { currentCity, deleteCity } = useCities();
  function formatDate(dateString) {
    const newDate = new Date(dateString);
    const date = Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return date.format(newDate);
  }
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <div
      className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
    >
      <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <img
          src={`https://flagcdn.com/w40/${countryCodes[city.country]}.png`}
          alt={country}
        />
        <span>{cityName}</span>
        <time>{formatDate(date)}</time>
      </Link>
      <button onClick={handleClick} className={styles.deleteBtn}>
        &times;
      </button>
    </div>
  );
}
