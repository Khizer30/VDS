"use client";
import { redirect, RedirectType } from "next/navigation";
import type { ReactNode } from "react";
//
import Loading from "@components/Loading";
import { useAuth } from "@components/AuthContext";

// Props
interface Props {
  children: ReactNode;
}

// Layout
export default function Layout({ children }: Props): ReactNode {
  const { user, loading } = useAuth();

  // Loading Screen
  if (loading) {
    return <Loading wScreen={true} hScreen={true} />;
  }

  // Redirect
  if (!user) {
    redirect("/login", RedirectType.replace);
  }

  return <> {children} </>;
}
