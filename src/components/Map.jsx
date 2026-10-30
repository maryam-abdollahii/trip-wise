import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import countryCodes from "../utils/countryCodes";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import useGeolocation from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
function MapClick({ setPosition }) {
  const navigate = useNavigate();

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      navigate(`/app/form?lat=${lat}&lng=${lng}`);
    },
  });
}
function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 13);
  }, [position, map]);
}

export default function Map() {
  const { cities } = useCities();
  const {
    isLoading,
    error,
    position: gpsPosition,
    getPosition,
  } = useGeolocation();
  const [lat, lng, setSearchParams] = useUrlPosition();

  const [position, setPosition] = useState(
    lat && lng ? [lat, lng] : [38.72, -9.14],
  );

  useEffect(() => {
    if (gpsPosition.lat && gpsPosition.lng) {
      setPosition([gpsPosition.lat, gpsPosition.lng]);
    }
  }, [gpsPosition]);
  return (
    <div className={styles.mapContainer}>
      <button
        className={styles.position}
        onClick={getPosition}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Use Your position"}
      </button>
      {error && (
        <Error
          title="Unable to get your location."
          message={error}
          suggestion="Please allow location access or try again."
        />
      )}{" "}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Selected location</Popup>
        </Marker>
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <img
                src={`https://flagcdn.com/w40/${countryCodes[city.country]}.png`}
                alt={city.country}
              />
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <MapClick setPosition={setPosition} setSearchParams={setSearchParams} />
        <ChangeCenter position={position} />
      </MapContainer>
    </div>
  );
}
