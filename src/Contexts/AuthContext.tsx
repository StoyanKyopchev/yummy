import React, { useEffect, useState } from "react";
import { auth } from "../Firebase";
import firebase from "firebase/compat/app";

interface AuthProps {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<firebase.User | null>(null);

export function AuthProvider({ children }: AuthProps) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
