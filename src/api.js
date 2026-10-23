import axios from "axios";

// Get the API_HOST from the .env file using Vite https://vite.dev/guide/env-and-mode#env-variables
// On Azure, VITE_API_HOST comes from the GitHub secret set in the workflow file.
export const API_HOST = import.meta.env.VITE_API_HOST;
console.log("API_HOST:", API_HOST);

// Every request made with `api` starts with API_HOST, e.g. api.get("/oceania")
const api = axios.create({ baseURL: API_HOST });

// Turns an Axios error into a message that tells the user what to check
export const errorMessage = (error) => {
  // Our API sends { error: "..." } for a 404, e.g. a country name that doesn't exist
  if (error.response?.data?.error) return error.response.data.error;
  // The API replied, but with an error such as 500. Its terminal shows why.
  if (error.response) {
    return `The API replied with error ${error.response.status}. Check the API's terminal for details.`;
  }
  // No reply at all: the API isn't running, or API_HOST is wrong
  return `Can't reach the API at ${API_HOST}. Is it running?`;
};

export default api;
