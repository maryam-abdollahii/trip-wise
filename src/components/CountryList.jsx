import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";
export default function CountryList() {
  const { cities } = useCities();
  const countries = cities.reduce((acc, city) => {
    if (!acc.some((item) => item.country === city.country)) {
      acc.push(city);
    }
    return acc;
  }, []);
  return (
    <div className={styles.countryList}>
      {countries.map((country) => {
        return (
          <CountryItem
            country={country.country}
            emoji={country.emoji}
            key={country.id}
          />
        );
      })}
    </div>
  );
}
