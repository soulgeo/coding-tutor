import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import ContinueLearningPage from "./components/pages/ContinueLearningPage";
import { AuthProvider, getCurrentUser } from "./context/AuthContext";
import LessonPage from "./components/pages/LessonPage";
import { UnitProvider } from "./context/UnitContext";

const requireAuthLoader = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }
  return user;
}

const requireNoAuthLoader = async () => {
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
    path: "/continue",
    element: <ContinueLearningPage />,
    loader: requireAuthLoader,
  },
  {
    path: "/units/:unitId/lessons/:id",
    element: <LessonPage />,
    loader: requireAuthLoader,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <UnitProvider>
        <RouterProvider router={router} />
      </UnitProvider>
    </AuthProvider>
  );
};

export default App;
