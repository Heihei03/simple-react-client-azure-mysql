import { Link } from "react-router-dom";
import { useApi } from "../useApi";

// GET /oceania returns the top 10 Oceania countries by life expectancy
export function Oceania() {
  const { data: countries, error, loading } = useApi("/oceania");

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
