import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import { AuthProvider, getCurrentUser } from "./context/AuthContext";
import LessonPage from "./components/pages/LessonPage";

async function requireAuthLoader() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }
  return user;
}

async function requireNoAuthLoader() {
  const user = await getCurrentUser();
  if (user) {
    return redirect("/dashboard");
  }
  return user;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>,
    loader: requireNoAuthLoader,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    loader: requireAuthLoader,
  },
  {
    path: "/lessons/:id",
    element: <LessonPage />,
    loader: requireAuthLoader,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
