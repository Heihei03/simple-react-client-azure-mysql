import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// StrictMode runs each useEffect twice in development to help catch bugs,
// so the API terminal shows every request twice. The built app only runs it once.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
