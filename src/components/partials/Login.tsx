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

  const onLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(error.code, error.message);
      } else {
        console.error("An unexpected error occurred", error);
      }
    }
  };

  return (
    <Card>
      <div className="w-full p-2 text-center font-bold">Sign In</div>
      <input
        type="text"
        className="input input-ghost w-full"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        className="input input-ghost w-full"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button className="btn btn-primary mt-2" onClick={onLogin}>
        Sign In
      </button>
    </Card>
  );
};

export default Login;
