import { signInWithEmailAndPassword } from "firebase/auth";
import Card from "../ui/Card";
import { auth } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/dashboard");
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
    </Card>
  );
};

export default Login;
