import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import ContinueLearningPage from "./components/pages/ContinueLearningPage";
import { AuthProvider, getCurrentUser } from "./context/AuthContext";
import LessonPage from "./components/pages/LessonPage";
import { UnitProvider } from "./context/UnitContext";
import ErrorPage from "./components/pages/ErrorPage";
import { Toaster, resolveValue } from "react-hot-toast";
import CustomToast from "./components/ui/CustomToast";

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
    loader: requireNoAuthLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    loader: requireAuthLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/continue",
    element: <ContinueLearningPage />,
    loader: requireAuthLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/units/:unitId/lessons/:id",
    element: <LessonPage />,
    loader: requireAuthLoader,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <>
      <AuthProvider>
        <UnitProvider>
          <RouterProvider router={router} />
        </UnitProvider>
      </AuthProvider>
      <Toaster
        position="bottom-right"
        containerStyle={{
          bottom: "40px",
          right: "20px",
        }}
        toastOptions={{
          duration: 4000,
        }}
      >
        {(t) => (
          <CustomToast
            t={t}
            message={resolveValue(t.message, t)}
            icon={t.icon}
          />
        )}
      </Toaster>
    </>
  );
};

export default App;
