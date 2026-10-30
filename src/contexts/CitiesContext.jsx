import { useCallback, useReducer } from "react";
import { createContext, useEffect, useContext } from "react";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  loading: false,
  error: "",
  currentCity: {},
};

function citiesReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: "" };
    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, loading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter(
          (city) => (city.id) !== (action.payload),
        ),
        currentCity:
          (state.currentCity.id) === (action.payload)
            ? {}
            : state.currentCity,
      };
    case "rejected":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(`unknown action type ${action.type}`);
  }
}
function CitiesProvider({ children }) {
  const BASE_URL = "http://localhost:8000";
  const [{ cities, loading, error, currentCity }, dispatch] = useReducer(
    citiesReducer,
    initialState,
  );

  useEffect(() => {
    const controller = new AbortController();
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const response = await fetch(`${BASE_URL}/cities`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`,
          );
        }
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        if (error.name === "AbortError") return;
        dispatch({ type: "rejected", payload: error.message });
      }
    }
    fetchCities();

    return () => {
      controller.abort();
    };
  }, []);

   const getCity= useCallback(async function getCity(id) {
    if (Number(id) === Number(currentCity.id)) return;
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`,
        );
      }
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  },[currentCity.id]) 

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`,
        );
      }
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      throw error;
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`,
        );
      }

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      throw error;
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        error,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error(
      "Cities Context Error: useCities must be used within CitiesProvider.",
    );
  }
  return context;
}
export { CitiesProvider, useCities };
