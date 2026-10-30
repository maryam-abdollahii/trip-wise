import { useEffect, useState } from "react";
export default function useFetchCities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchCities() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/cities", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`,
          );
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.log(error);
        setError(error.message)
      } finally {
        setLoading(false);
      }
    }
    fetchCities();

    return () => {
      controller.abort();
    };
  }, []);
  return { cities, loading,error };
}
