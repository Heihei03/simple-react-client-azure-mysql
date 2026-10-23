import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>
        This React app gets its data from our Node.js API, which reads the world
        database on Azure MySQL.
      </p>
      <p>
        Start with <Link to="/allcountries">All Countries</Link>, then try the
        other pages in the menu.
      </p>
    </div>
  );
}
