import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import { AuthProvider } from "./context/AuthContext";

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
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App;
