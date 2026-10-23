# React Client for our Azure MySQL Database and Node.js API

A React app that shows data from the world database. It talks to the
[Node.js API](https://github.com/Mission-Ready/node_server_for_azure_mysql), which reads from Azure Database for MySQL.

## Dependencies

- React
- React Router
- React Error Boundary
- Axios
- Vite
- ESLint
- Prettier

## Environment Variables

Copy `.env.example` to `.env` and point it at your API:

```
VITE_API_HOST=http://localhost:4000
```

Use your Azure App Service URL instead once your API is deployed. Restart `npm run dev` after changing `.env`.

## Instructions

1. Fork and clone the repository
2. Run `npm install` to install the dependencies
3. Create your `.env` file (see above)
4. Run `npm run dev` to start the development server
5. Open `http://localhost:5173` in your browser

## Pages

| Page          | URL                      | API endpoint                 |
| ------------- | ------------------------ | ---------------------------- |
| Home          | `/`                      | none                         |
| All Countries | `/allcountries`          | `GET /`                      |
| Oceania       | `/oceania`               | `GET /oceania`               |
| Country       | `/country/:countryname`  | `GET /country/:countryname`  |
| Population    | `/population/:continent` | `GET /population/:continent` |

Country names must match the database exactly, e.g. `/country/New Zealand`.

## How it fits together

- `src/api.js`: an Axios instance that adds `VITE_API_HOST` to the start of every request
- `src/useApi.js`: a hook that fetches a path when a page loads and returns `{ data, error, loading }`
- `src/App.jsx`: the routes, matching each URL to a page in `src/pages/`
- `src/Layout.jsx`: the header and sidebar. The current page renders in its `<Outlet />`, inside an error boundary

## Deploying to Azure Static Web Apps

The workflow in `.github/workflows/` builds and deploys the app on every push to `main`.

- Add a repository secret called `VITE_API_HOST` with your API's URL. Vite bakes it into the build, so changing it needs a new deploy.
- `public/staticwebapp.config.json` sends every URL to `index.html`, so React Router can handle it. Without it, refreshing `/allcountries` on Azure gives a 404.
- Your API must allow requests from your Static Web App's domain (CORS).

## Scripts

- `npm run dev`: start the development server
- `npm run build`: build the app into `dist/`
- `npm run preview`: serve the built app locally
- `npm run lint`: check the code with ESLint
- `npm run prettier:check` / `npm run prettier:write`: check or fix formatting
