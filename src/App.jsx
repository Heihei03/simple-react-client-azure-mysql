import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Countries } from "./pages/Countries";
import { Oceania } from "./pages/Oceania";
import { Country } from "./pages/Country";
import { Population } from "./pages/Population";
import { NotFound } from "./pages/NotFound";

// Each route matches a URL to a page. The pages render inside <Layout />'s <Outlet />.
// The :countryname and :continent parts are read in the page with useParams().
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "allcountries", element: <Countries /> },
      { path: "oceania", element: <Oceania /> },
      { path: "country/:countryname", element: <Country /> },
      { path: "population/:continent", element: <Population /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
