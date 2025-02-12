import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata =
{
  title: "404 | Vehicle Detection System"
};

// 404 Page
export default function Page(): ReactNode
{
  return (
    <>
      <div className=" w-screen h-screen flex flex-col justify-center items-center">
        <h1 className=" font-secondary font-bold text-center text-9xl"> 404 </h1>
        <h2 className=" font-secondary font-bold text-center text-5xl md:text-7xl"> Page Not Found! </h2>
      </div>
    </>
  );
}
