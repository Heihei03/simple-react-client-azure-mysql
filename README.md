# World Countries: React Client

A React app that shows countries from the world database. It gets its data from our [Node.js API](https://github.com/Mission-Ready/node_server_for_azure_mysql).

## Run it

You need Node.js 20 or newer. Check with `node -v`.

1. Start the [API](https://github.com/Mission-Ready/node_server_for_azure_mysql) first. It runs on `http://localhost:4000`.
2. Fork and clone this repo, then run `npm install`.
3. Copy `.env.example` to `.env`. It points the app at `http://localhost:4000`.
4. Run `npm run dev` and open `http://localhost:5173`.

Vite reads `.env` only when it starts, so restart `npm run dev` after you change it.

Each request shows up twice in the API's terminal. That's React's StrictMode, which runs effects twice in development to catch bugs. The deployed app only sends each request once.

## Pages

| Page          | URL                      | API endpoint                 |
| ------------- | ------------------------ | ---------------------------- |
| Home          | `/`                      | none                         |
| All Countries | `/allcountries`          | `GET /`                      |
| Oceania       | `/oceania`               | `GET /oceania`               |
| Country       | `/country/:countryname`  | `GET /country/:countryname`  |
| Population    | `/population/:continent` | `GET /population/:continent` |

Country names must match the database exactly: `/country/New Zealand` works, `/country/newzealand` gives a 404.

## Where things are

- `src/App.jsx`: the routes. Each URL shows one page.
- `src/pages/`: the pages. Each one fetches its data in `useEffect` and keeps it in `useState`.
- `src/Layout.jsx`: the header and menu. The current page appears where `<Outlet />` is.
- `src/api.js`: Axios set up with `VITE_API_HOST`, so a page only needs `api.get("/oceania")`. `errorMessage()` turns a failed request into a message that says what to check.

## Try it yourself

1. **All continents page.** Add a `/continents` page that links to the Population page for each of the 7 continents: Asia, Europe, North America, Africa, Oceania, Antarctica, South America. Add a route in `App.jsx` and a link in `Layout.jsx`.
2. **Sort the table.** On All Countries, add a button that sorts by population. Sort a copy, not the state itself: `[...countries].sort((a, b) => b.Population - a.Population)`.
3. **Search box.** Add an `<input>` to All Countries that filters the table by name as you type. Keep the text in `useState`, then show `countries.filter((country) => country.Name.toLowerCase().includes(search.toLowerCase()))`.

## Deploy to Azure Static Web Apps

1. Deploy the API to Azure App Service first, and copy its URL.
2. In your GitHub repo, add a secret called `VITE_API_HOST` with that URL (Settings > Secrets and variables > Actions).
3. Create a Static Web App in Azure from your repo. Use `/` for the app location and `dist` for the output location.
4. Azure adds a workflow file to `.github/workflows/`. Pull it, then pass your secret to the build by adding the `env:` lines to its "Build And Deploy" step:

   ```yaml
   - name: Build And Deploy
     id: builddeploy
     uses: Azure/static-web-apps-deploy@v1
     env:
       VITE_API_HOST: ${{ secrets.VITE_API_HOST }}
   ```

   Commit and push. The workflow runs again and deploys with your API URL.

Vite builds the API URL into the app, so after changing the secret, re-run the workflow.

`public/staticwebapp.config.json` sends every URL to `index.html`, so links like `/allcountries` still work when you refresh the page.
