import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api";

export function Oceania() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // GET /oceania returns the top 10 Oceania countries by life expectancy
  useEffect(() => {
    const fetchOceaniaCountries = async () => {
      try {
        const response = await api.get("/oceania");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching Oceania countries:", error.message);
        setError("Failed to fetch Oceania countries.");
      } finally {
        setLoading(false);
      }
    };

    fetchOceaniaCountries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (countries.length === 0) return <p>No countries found for Oceania.</p>;

  return (
    <div>
      <h2>Oceania Countries</h2>
      <ol>
        {countries.map((country) => (
          <li key={country.Name}>
            <Link to={`/country/${country.Name}`}>
              <strong>{country.Name}</strong>
            </Link>{" "}
            - Life Expectancy: {country.LifeExpectancy ?? "unknown"}
          </li>
        ))}
      </ol>
    </div>
  );
}
