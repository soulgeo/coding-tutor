import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import type { User } from "firebase/auth";

interface AuthContextType {
  user?: User;
  userLoggedIn: boolean;
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          setCurrentUser({ ...user });
          setUserLoggedIn(true);
        } else {
          setCurrentUser(null);
          setUserLoggedIn(false);
        }
        setLoading(false);
      }),
    [],
  );

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
