import { signOut } from "firebase/auth";
import Card from "../ui/Card";
import { auth } from "../../firebase";
import { MouseEvent } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getAuthErrorMessage } from "../../api/authErrors";

interface LogoutProps {
  closeModal?: () => void;
}

const Logout = ({ closeModal }: LogoutProps) => {
  const navigate = useNavigate();

  const onSubmit = (e: MouseEvent) => {
    e.stopPropagation();

    const logoutPromise = signOut(auth);

    toast.promise(logoutPromise, {
      loading: "Signing out...",
      success: "Successfully signed out!",
      error: (err) => getAuthErrorMessage(err),
    });

    logoutPromise.then(() => {
      if (closeModal) {
        closeModal();
      }
      navigate("/");
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
