import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import Layout from "../layout/Layout";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  let title = "Oops!";
  let message = "An unexpected error has occurred.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 - Not Found";
      message = "The page you are looking for does not exist.";
    } else {
      title = `${error.status} ${error.statusText}`;
      message = typeof error.data === 'string' ? error.data : (error.data?.message || message);
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-6xl font-bold text-error mb-4">{title}</h1>
        <p className="text-xl mb-8">{message}</p>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </Layout>
  );
};

export default ErrorPage;
