import { createUserWithEmailAndPassword } from "firebase/auth";
import Card from "../ui/Card";
import { auth, db } from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FirebaseError } from "firebase/app";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (password != password2) {
      console.log("Passwords do not match")
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        try {
          await setDoc(doc(db, "users", user.uid), {
            email: email,
            displayName: displayName,
            createdAt: serverTimestamp(),
            unitsProgress: {}
          })

          navigate("/dashboard");

        } catch (dbError) {
          console.error("Error adding document", dbError)
        }
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
    </Card>
  );
};

export default Signup;
