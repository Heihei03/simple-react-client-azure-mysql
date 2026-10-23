import axios from "axios";

// Get the API_HOST from the .env file using Vite https://vite.dev/guide/env-and-mode#env-variables
// On Azure, VITE_API_HOST comes from the GitHub secret set in the workflow file.
export const API_HOST = import.meta.env.VITE_API_HOST;
console.log("API_HOST:", API_HOST);

// Every request made with `api` starts with API_HOST, e.g. api.get("/oceania")
const api = axios.create({ baseURL: API_HOST });

export default api;
