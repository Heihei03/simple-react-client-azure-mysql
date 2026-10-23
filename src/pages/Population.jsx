import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";

export function Population() {
  // Read :continent from the URL, e.g. /population/Europe
  const { continent } = useParams();
  const [population, setPopulation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // GET /population/:continent returns { Continent, TotalPopulation }, or 404 if there's no such continent.
  // [continent] means this runs again when the URL changes to another continent.
  useEffect(() => {
    // If the user clicks another continent before this reply arrives, ignore the old reply
    let ignore = false;

    const fetchPopulation = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/population/${encodeURIComponent(continent)}`,
        );
        if (!ignore) setPopulation(response.data);
      } catch (error) {
        console.error(
          `Error fetching population of ${continent}:`,
          error.message,
        );
        // Our API sends { error: "..." } for a 404, so show that if there is one
        if (!ignore) {
          setError(
            error.response?.data?.error || "Failed to fetch population.",
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchPopulation();

    // React runs this cleanup before the next fetch, and when the user leaves the page
    return () => {
      ignore = true;
    };
  }, [continent]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Population of {population.Continent}</h2>
      <p className="big-number">
        {population.TotalPopulation.toLocaleString()}
      </p>
    </div>
  );
}
