import { Link, useParams } from "react-router-dom";
import { useApi } from "../useApi";

// The columns from the country table we show, and their labels
const fields = [
  ["Code", "Code"],
  ["Region", "Region"],
  ["Population", "Population"],
  ["LifeExpectancy", "Life expectancy"],
  ["SurfaceArea", "Surface area (km²)"],
  ["IndepYear", "Independence year"],
  ["GovernmentForm", "Government"],
  ["HeadOfState", "Head of state"],
  ["GNP", "GNP (million USD)"],
];

// Big numbers get commas (5,000,000), but not years or life expectancy
const withCommas = ["Population", "SurfaceArea", "GNP"];

const formatValue = (column, value) => {
  if (value === null || value === "") return "unknown";
  return withCommas.includes(column) ? value.toLocaleString() : value;
};

// GET /country/:countryname returns [country], or 404 if the name doesn't match
export function Country() {
  // Read :countryname from the URL, e.g. /country/New Zealand
  const { countryname } = useParams();
  const { data, error, loading } = useApi(
    `/country/${encodeURIComponent(countryname)}`,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const country = data[0];

  return (
    <div>
      <h2>{country.Name}</h2>
      <dl>
        <div>
          <dt>Continent</dt>
          <dd>
            <Link to={`/population/${country.Continent}`}>
              {country.Continent}
            </Link>
          </dd>
        </div>
        {fields.map(([column, label]) => (
          <div key={column}>
            <dt>{label}</dt>
            <dd>{formatValue(column, country[column])}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
