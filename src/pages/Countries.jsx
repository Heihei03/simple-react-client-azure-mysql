import { Link } from "react-router";
import { useApi } from "../useApi";

// GET / returns every country
export function Countries() {
  const { data: countries, error, loading } = useApi("/");

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
