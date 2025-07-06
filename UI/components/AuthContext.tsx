"use client";
import React, { createContext, useContext, useEffect, useState, type ReactNode, type Context } from "react";
//
import type { ResponseInterface, LoginInterface, UserInterface, AuthContextInterface } from "@models/types";

// Props
interface Props {
  children: ReactNode;
}

// Auth Context
const AuthContext: Context<AuthContextInterface> = createContext<AuthContextInterface>({
  user: null,
  loading: true,
  login: async () => {
    throw new Error();
  },
  logout: async () => {
    throw new Error();
  }
});

// Auth Provider
export function AuthProvider({ children }: Props): ReactNode {
  // States
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);

  // On Mount
  useEffect(() => {
    updateUser();
  }, []);

  // Update User
  async function updateUser(): Promise<void> {
    const url: string = "/api/me";

    const response: Response = await fetch(url, {
      mode: "same-origin",
      credentials: "same-origin",
      method: "GET"
    });

    const res: ResponseInterface = await response.json();

    if (res.success) {
      const tempUser: UserInterface = JSON.parse(res.message) as UserInterface;
      setUser(tempUser);
    }

    setLoading(false);
  }

  // Login
  async function login(data: LoginInterface): Promise<ResponseInterface> {
    const url: string = "/api/login";

    const response: Response = await fetch(url, {
      mode: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const res: ResponseInterface = await response.json();

    if (res.success) {
      const tempUser: UserInterface = JSON.parse(res.message) as UserInterface;
      setUser(tempUser);

      res.message = `Welcome ${tempUser.name}`;
    }

    return res;
  }

  // Logout
  async function logout(): Promise<ResponseInterface> {
    const url: string = "/api/logout";

    const response: Response = await fetch(url, {
      mode: "same-origin",
      credentials: "same-origin",
      method: "GET"
    });

    const res: ResponseInterface = await response.json();

    setUser(null);

    return res;
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}> {children} </AuthContext.Provider>;
}

// Use Auth Hook
export const useAuth = () => useContext(AuthContext);
