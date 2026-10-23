import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api, { errorMessage } from "../api";

export function Country() {
  // Read :countryname from the URL, e.g. /country/New Zealand
  const { countryname } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // GET /country/:countryname returns [country], or 404 if the name doesn't match.
  // [countryname] means this runs again when the URL changes to another country.
  useEffect(() => {
    // If the user clicks another country before this reply arrives, ignore the old reply
    let ignore = false;

    const fetchCountry = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/country/${encodeURIComponent(countryname)}`,
        );
        if (!ignore) setCountry(response.data[0]);
      } catch (error) {
        console.error(`Error fetching ${countryname}:`, error.message);
        if (!ignore) setError(errorMessage(error));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchCountry();

    // React runs this cleanup before the next fetch, and when the user leaves the page
    return () => {
      ignore = true;
    };
  }, [countryname]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  // Some countries have no value for a column, so ?? and || show "unknown" instead
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
        <div>
          <dt>Code</dt>
          <dd>{country.Code}</dd>
        </div>
        <div>
          <dt>Local name</dt>
          <dd>{country.LocalName}</dd>
        </div>
        <div>
          <dt>Region</dt>
          <dd>{country.Region}</dd>
        </div>
        <div>
          <dt>Population</dt>
          {/* toLocaleString() adds commas: 3862000 becomes 3,862,000 */}
          <dd>{country.Population.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Life expectancy</dt>
          <dd>{country.LifeExpectancy ?? "unknown"}</dd>
        </div>
        <div>
          <dt>Independence year</dt>
          <dd>{country.IndepYear ?? "unknown"}</dd>
        </div>
        <div>
          <dt>Head of state</dt>
          <dd>{country.HeadOfState || "unknown"}</dd>
        </div>
      </dl>
    </div>
  );
}
