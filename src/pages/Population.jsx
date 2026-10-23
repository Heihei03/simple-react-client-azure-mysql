import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";

export function Population() {
  // Read :continent from the URL, e.g. /population/Europe
  const { continent } = useParams();
  const [population, setPopulation] = useState(null);
  const [error, setError] = useState(null);

  // GET /population/:continent returns { Continent, TotalPopulation }, or 404 if there's no such continent.
  // [continent] means this runs again when the URL changes to another continent.
  useEffect(() => {
    const fetchPopulation = async () => {
      setPopulation(null);
      setError(null);
      try {
        const response = await api.get(
          `/population/${encodeURIComponent(continent)}`,
        );
        setPopulation(response.data);
      } catch (error) {
        console.error(
          `Error fetching population of ${continent}:`,
          error.message,
        );
        // Our API sends { error: "..." } for a 404, so show that if there is one
        setError(error.response?.data?.error || "Failed to fetch population.");
      }
    };

    fetchPopulation();
  }, [continent]);

  if (error) return <p className="error">{error}</p>;
  if (!population) return <p>Loading...</p>;

  return (
    <div>
      <h2>Population of {population.Continent}</h2>
      <p className="big-number">
        {population.TotalPopulation.toLocaleString()}
      </p>
    </div>
  );
}
