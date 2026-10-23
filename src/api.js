import axios from "axios";

// Get the API_HOST from the .env file using Vite https://vite.dev/guide/env-and-mode#env-variables
// On Azure, VITE_API_HOST comes from the GitHub secret set in the workflow file.
const API_HOST = import.meta.env.VITE_API_HOST;
console.log("API_HOST:", API_HOST);

if (!API_HOST) {
  console.warn(
    "VITE_API_HOST is not set. Copy .env.example to .env and restart npm run dev.",
  );
}

// Every request made with `api` starts with API_HOST, e.g. api.get("/oceania")
const api = axios.create({ baseURL: API_HOST });

export default api;
