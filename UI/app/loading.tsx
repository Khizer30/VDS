import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import Loading from "@components/Loading";

export const metadata: Metadata =
{
  title: "Loading... | Vehicle Detection System"
};

// Loading Page
export default function Page(): ReactNode
{
  return (
    <>
      <Loading header={ false } />
    </>
  );
}
