import { signInWithEmailAndPassword } from "firebase/auth";
import Card from "../ui/Card";
import { auth } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getAuthErrorMessage } from "../../api/authErrors";

interface LoginProps {
  closeModal?: () => void;
  onShowSignup?: () => void;
}

const Login = ({ closeModal, onShowSignup }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const loginPromise = signInWithEmailAndPassword(auth, email, password);

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "Successfully logged in!",
      error: (err) => getAuthErrorMessage(err),
    });

    loginPromise.then(() => {
      if (closeModal) {
        closeModal();
      }
      navigate("/dashboard");
    });
  };

  return (
    <Card>
      <div className="w-full p-2 text-center font-bold">Log In</div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="input input-ghost w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className="input input-ghost w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit" className="btn btn-primary mt-2">
          Log In
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-base-content/60">
        Don't have an account?{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (onShowSignup) onShowSignup();
          }}
          className="link link-hover text-primary font-medium"
        >
          Sign Up
        </button>
      </div>
    </Card>
  );
};

export default Login;
