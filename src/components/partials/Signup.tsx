import { createUserWithEmailAndPassword } from "firebase/auth";
import Card from "../ui/Card";
import { auth, db } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { getAuthErrorMessage } from "../../api/authErrors";

interface SignupProps {
  closeModal?: () => void;
  onShowLogin?: () => void;
}

const Signup = ({ closeModal, onShowLogin }: SignupProps) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (password != password2) {
      toast.error("Passwords do not match");
      return;
    }

    const signupPromise = (async () => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        displayName: displayName,
        createdAt: serverTimestamp(),
        unitsProgress: {},
        lessonsProgress: {},
      });
    })();

    toast.promise(signupPromise, {
      loading: "Creating account...",
      success: "Account created successfully!",
      error: (err) => getAuthErrorMessage(err),
    });

    signupPromise.then(() => {
      if (closeModal) {
        closeModal();
      }
      navigate("/units/unit01/lessons/u01_lsn01");
    });
  };

  return (
    <Card>
      <div className="w-full p-2 text-center font-bold">Sign Up</div>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="input input-ghost w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="text"
          className="input input-ghost w-full"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        ></input>
        <input
          type="password"
          className="input input-ghost w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          className="input input-ghost w-full"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        ></input>
        <button type="submit" className="btn btn-primary mt-2">
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-base-content/60">
        Already have an account?{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (onShowLogin) onShowLogin();
          }}
          className="link link-hover text-primary font-medium"
        >
          Log In
        </button>
      </div>
    </Card>
  );
};

export default Signup;
