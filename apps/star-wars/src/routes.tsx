import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./root";
import * as FilmsPage from "./routes/FilmsPage";
import * as PlanetsPage from "./routes/PlanetsPage";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <h1>Home Page</h1>,
      },
      {
        path: "/films",
        loader: FilmsPage.loader,
        element: <FilmsPage.default />,
      },
      {
        path: "/people",
        element: <h1>People Page</h1>,
      },
      {
        path: "/planets",
        loader: PlanetsPage.loader,
        element: (
          <Suspense fallback="Loading...">
            <PlanetsPage.default />
          </Suspense>
        ),
      },
      {
        path: "/star-ships",
        element: <h1>Star Ships Page</h1>,
      },
      {
        path: "/vehicles",
        element: <h1>Vehicles Page</h1>,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
