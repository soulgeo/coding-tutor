import { signOut } from "firebase/auth";
import Card from "../ui/Card";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";

const Logout = () => {
  const navigate = useNavigate();

  const onSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error: unknown) => {
        if (error instanceof FirebaseError) {
          console.log(error.code, error.message);
        } else {
          console.error("An unexpected error occurred", error);
        }
      });
  };

  return (
    <Card>
      <div className="w-full p-2 text-center font-bold">Are you sure?</div>
      <button className="btn btn-error mt-2" onClick={onSubmit}>
        Sign Out
      </button>
    </Card>
  );
};
export default Logout;
