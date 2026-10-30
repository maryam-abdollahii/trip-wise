// import data from "../data/cities.json";
import { useParams } from "react-router-dom";
import styles from "./CityDetails.module.css";
import BackButton from "./BackButton";
import countryCodes from "../utils/countryCodes";
import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import Loader from "./Loader";
import Error from "./Error";
export default function CityDetails() {
  const { loading, error, currentCity, getCity } = useCities();
  const { id } = useParams();
  const { cityName, date, notes, country } = currentCity;
  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  function formatDate(date) {
    const newDate = new Date(date);
    const dateString = Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return dateString.format(newDate);
  }

  if (loading) return <Loader />;
  if (error)
    return (
      <Error
        title="Failed to load city details."
        message="We couldn't load the details for this city."
      />
    );
  if (!currentCity.id) return <Loader />;
  return (
    <div className={styles.cityDetails}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <img
            src={`https://flagcdn.com/w40/${countryCodes[country]}.png`}
            alt={country}
          />
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p> {formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}
