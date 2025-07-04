import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Vehicle Detection System",
};

// 404 Page
export default function Page(): ReactNode {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <h1 className="font-primary text-center text-9xl font-bold"> 404 </h1>
        <h2 className="font-primary text-center text-5xl font-bold md:text-7xl">
          Page Not Found!
        </h2>
      </div>
    </>
  );
}
