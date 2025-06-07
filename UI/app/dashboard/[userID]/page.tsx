import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import Dashboard from "@components/Dashboard";

export const metadata: Metadata =
{
  title: "Dashboard | Vehicle Detection System"
};

// Props
interface Props
{
  params: Promise<{ userID: string; }>;
}

// Dashboard Page
export default async function Page({ params }: Props): Promise<ReactNode>
{
  const { userID } = await params;

  return (
    <>
      <Dashboard />
    </>
  );
}