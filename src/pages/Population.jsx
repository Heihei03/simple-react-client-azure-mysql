import { useParams } from "react-router";
import { useApi } from "../useApi";

// GET /population/:continent returns { Continent, TotalPopulation }, or 404 if there's no such continent
export function Population() {
  // Read :continent from the URL, e.g. /population/Europe
  const { continent } = useParams();
  const { data, error, loading } = useApi(
    `/population/${encodeURIComponent(continent)}`,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Population of {data.Continent}</h2>
      <p className="big-number">{data.TotalPopulation.toLocaleString()}</p>
    </div>
  );
}
