import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import History from "@components/History";

export const metadata: Metadata =
{
  title: "Detection History | Vehicle Detection System"
};

// Detection History Page
export default function Page(): ReactNode
{
  return (
    <>
      <History />
    </>
  );
}