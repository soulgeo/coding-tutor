import { Link } from "react-router";
import { useAuth } from "../../../context/AuthContext";

const Navigation = () => {
  const { userLoggedIn } = useAuth();

  return (
    <>
      {userLoggedIn && (
        <div>
          <Link to="/dashboard" className="btn btn-ghost">
            Dashboard
          </Link>
        </div>
      )}
    </>
  );
};

export default Navigation;
