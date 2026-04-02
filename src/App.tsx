import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./components/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
