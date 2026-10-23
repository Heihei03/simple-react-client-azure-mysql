import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api";

export function Countries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // GET / returns every country. The empty [] means this runs once, when the page loads.
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error.message);
        setError("Failed to fetch countries.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>All Countries</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Continent</th>
            <th>Region</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.Code}>
              <td>
                <Link to={`/country/${country.Name}`}>{country.Name}</Link>
              </td>
              <td>
                <Link to={`/population/${country.Continent}`}>
                  {country.Continent}
                </Link>
              </td>
              <td>{country.Region}</td>
              <td>{country.Population.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
