import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import Dashboard from "@components/Dashboard";

export const metadata: Metadata =
{
  title: "Dashboard | Vehicle Detection System"
};


// Dashboard Page
export default function Page(): ReactNode
{
  return (
    <>
      <Dashboard />
    </>
  );
}