"use client";
import React, { createContext, useContext, useEffect, useState, type ReactNode, type Context } from "react";
//
import type { ResponseInterface, UserInterface, AuthContextInterface } from "@models/types";

// Props
interface Props {
  children: ReactNode;
}

// Auth Context
const AuthContext: Context<AuthContextInterface> = createContext<AuthContextInterface>({
  user: null,
  loading: true
});

// Auth Provider
export function AuthProvider({ children }: Props): ReactNode {
  // States
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);

  // On Mount
  useEffect(() => {
    (async () => {
      const url: string = "/api/me";

      const response: Response = await fetch(url, {
        mode: "same-origin",
        credentials: "same-origin",
        method: "GET"
      });

      let res: ResponseInterface = await response.json();

      if (res.success) {
        const tempUser: UserInterface = JSON.parse(res.message) as UserInterface;
        setUser(tempUser);
      }

      setLoading(false);
    })();
  }, []);

  return <AuthContext.Provider value={{ user, loading }}> {children} </AuthContext.Provider>;
}

// Use Auth Hook
export const useAuth = () => useContext(AuthContext);
