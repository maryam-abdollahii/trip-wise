import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Loader from "./Loader";
import Error from "./Error";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import countryCodes from "../utils/countryCodes";
export default function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const { createCity } = useCities();
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();
  const countryCode = countryCodes[country] || "";
  useEffect(() => {
    if (lat === null || lng === null) return;

    const controller = new AbortController();

    async function fetchNewCity() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error("Unable to fetch location details.");
        }

        const data = await res.json();
        const address = data.address ?? {};

        const city =
          address.city ||
          address.town ||
          address.village ||
          address.municipality ||
          "";

        setCityName(city);
        setCountry(address.country || "");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Could not retrieve location details.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchNewCity();

    return () => controller.abort();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      countryCode,
      date,
      notes,
      position: {
        lat: Number(lat),
        lng: Number(lng),
      },
    };

    try {
      await createCity(newCity);
      navigate("/app/cities");
    } catch (error) {
      setSubmitError(error.message);
    }
  }

  if (isLoading) return <Loader />;

  if (error)
    return (
      <Error
        title="Location error."
        message={error}
        suggestion="Please try again or select another location on the map."
      />
    );
  if (submitError)
    return (
      <Error
        title="Failed to add city."
        message={submitError}
        suggestion="Please try again."
      />
    );
  if (!lat || !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          required
        />

        <label htmlFor="country">Country name</label>
        <div className={styles.countryField}>
          <input
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />

          {countryCode && (
            <img
              src={`https://flagcdn.com/w40/${countryCode}.png`}
              alt={`${country} flag`}
            />
          )}
        </div>

        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          type="submit"
          className={styles.button}
          disabled={isLoading || !cityName}
        >
          Add
        </button>
      </form>
    </div>
  );
}
