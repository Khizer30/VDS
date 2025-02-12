import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata =
{
  title: "Dashboard | Vehicle Detection System"
};

// Dashboard Page
export default function Page(): ReactNode
{
  return (
    <>
      <div className=" w-full h-full flex justify-center items-center">
        <h1 className=" font-secondary font-bold text-5xl"> Hello, Khizer </h1>
      </div>
    </>
  );
}