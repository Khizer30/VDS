"use client";
import { useState, useEffect, useContext, createContext, type Context } from "react";
import { User } from "@prisma/client";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
//
import { auth } from "@lib/supabase";
import { authContextObj } from "@lib/objects";
import { fetchUser } from "@lib/server";
import type { Props, AuthContextInterface } from "@lib/interface";

const AuthContext: Context<AuthContextInterface> = createContext<AuthContextInterface>(authContextObj);

// Use Auth Hook
export const useAuth = () => useContext(AuthContext);

// Auth Provider
export const AuthProvider = ({ children }: Props) =>
{
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // On Mount
  useEffect(() =>
  {
    checkSession();

    // On Auth State Change
    const { data } = auth.onAuthStateChange(async (e: AuthChangeEvent, session: Session | null) =>
    {
      if (session && session.user && session.user.email)
      {
        let user: User | null = await fetchUser(session.user.email);

        if (user)
        {
          setUser(user);
          setLoading(false);
        }
      }
    });

    return () => { data.subscription.unsubscribe(); };
  }, []);

  // Check Session
  async function checkSession(): Promise<void>
  {
    const { data } = await auth.getUser();

    if (data.user && data.user.email)
    {
      let user: User | null = await fetchUser(data.user.email);

      if (user)
      {
        setUser(user);
        setLoading(false);
      }
    }
  }

  return (
    <AuthContext.Provider value={ { user, loading } }>
      { children }
    </AuthContext.Provider>
  );
};