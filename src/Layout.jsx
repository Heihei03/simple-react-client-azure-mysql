import { NavLink, Outlet, useLocation } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import PropTypes from "prop-types";

const links = [
  { to: "/", label: "Home" },
  { to: "/allcountries", label: "All Countries" },
  { to: "/oceania", label: "Oceania" },
  { to: "/country/Australia", label: "Country - Australia" },
  { to: "/country/New Zealand", label: "Country - New Zealand" },
  { to: "/population/Europe", label: "Population - Europe" },
];

// Shown instead of the page if it crashes while rendering
const ErrorFallback = ({ error }) => {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <pre className="error">{error.message}</pre>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

// The header and sidebar stay on screen. The current page renders in <Outlet />.
export function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      <header className="header">
        <img src="/MR.svg" alt="Mission Ready" className="logo" />
        <h1>World Countries</h1>
      </header>

      <nav className="sidebar">
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              {/* NavLink adds the "active" class when its page is open */}
              <NavLink to={link.to} end>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main className="content">
        {/* resetKeys clears the error when the user goes to another page */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          resetKeys={[location.pathname]}
        >
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}
