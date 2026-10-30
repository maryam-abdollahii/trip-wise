import styles from "./CountryItem.module.css";
import countryCodes from "../utils/countryCodes";
export default function CountryItem({ country }) {
  return (
    <div className={styles.countryItem}>
      <p>
        <img
          src={`https://flagcdn.com/w40/${countryCodes[country]}.png`}
          alt={country}
        />
      </p>
      <p>{country}</p>
    </div>
  );
}
