import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: "/dashboard",
    element: <DashboardPage />
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
