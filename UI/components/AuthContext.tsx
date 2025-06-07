"use client";
import { useState, useEffect, useContext, createContext, type Context } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
//
import { auth } from "@lib/supabase";
import { authContextObj } from "@lib/objects";
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
      if (session && session.user)
      {
        setUser(session.user);
        setLoading(false);
      }
      else
      {
        setUser(null);
        setLoading(false);
      }
    });

    return () => { data.subscription.unsubscribe(); };
  }, []);

  // Check Session
  async function checkSession(): Promise<void>
  {
    const { data } = await auth.getUser();

    if (data.user)
    {
      setUser(data.user);
      setLoading(false);
    }
    else
    {
      setUser(null);
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={ { user, loading } }>
      { children }
    </AuthContext.Provider>
  );
};