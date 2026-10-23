import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../api";

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

export function Country() {
  // Read :countryname from the URL, e.g. /country/New Zealand
  const { countryname } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  // GET /country/:countryname returns [country], or 404 if the name doesn't match.
  // [countryname] means this runs again when the URL changes to another country.
  useEffect(() => {
    const fetchCountry = async () => {
      setCountry(null);
      setError(null);
      try {
        const response = await api.get(
          `/country/${encodeURIComponent(countryname)}`,
        );
        setCountry(response.data[0]);
      } catch (error) {
        console.error(`Error fetching ${countryname}:`, error.message);
        // Our API sends { error: "..." } for a 404, so show that if there is one
        setError(error.response?.data?.error || "Failed to fetch country.");
      }
    };

    fetchCountry();
  }, [countryname]);

  if (error) return <p className="error">{error}</p>;
  if (!country) return <p>Loading...</p>;

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
