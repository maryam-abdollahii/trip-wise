import CityList from "./CityList";
import Loader from "./Loader";
import Error from "./Error";
import { useCities } from "../contexts/CitiesContext";
export default function Cities() {
  const { loading, error } = useCities();

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error
          title="Failed to load cities."
          message="We couldn't load your cities."
          suggestion="Please check your connection and try again."
        />
      ) : (
        <CityList />
      )}
    </>
  );
}
