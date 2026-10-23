import { Link } from "react-router";

export function NotFound() {
  return (
    <div>
      <h2>Page not found</h2>
      <p>
        Go back <Link to="/">home</Link>.
      </p>
    </div>
  );
}
