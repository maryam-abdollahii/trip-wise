import CountryList from "./CountryList";
import Loader from "./Loader";
import Error from "./Error";
import { useCities } from "../contexts/CitiesContext";
export default function Countries() {
  const { loading, error } = useCities();

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error
          title="Failed to load countries."
          message="We couldn't load the list of countries."
        />
      ) : (
        <CountryList />
      )}
    </div>
  );
}
