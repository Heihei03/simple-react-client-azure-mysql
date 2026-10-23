import { useEffect, useState } from "react";
import api from "./api";

// Fetch data from our API when a page loads, and again whenever `path` changes.
// Returns { data, error, loading } so each page can show the right thing.
export function useApi(path) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cancel the request if the user leaves the page before it finishes
    const controller = new AbortController();

    const fetchData = async () => {
      setData(null);
      setError(null);
      setLoading(true);
      try {
        const response = await api.get(path, { signal: controller.signal });
        setData(response.data);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error(`Error fetching ${path}:`, err.message);
        // Our API sends { error: "..." } for 404s, so show that message if there is one
        setError(err.response?.data?.error || `Failed to fetch ${path}`);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [path]);

  return { data, error, loading };
}
