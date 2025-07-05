import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import logo from "@images/logo.webp";

export const metadata: Metadata = {
  title: "Dashboard | Vehicle Detection System"
};

// Dashboard Page
export default function Page(): ReactNode {
  return (
    <>
      <div className="h-screen">
        <header className="flex h-1/6 items-center justify-start p-10">
          <Image src={logo} alt="VDH Logo" priority draggable={false} className="w-40" />
        </header>
        <div className="grid h-5/6 grid-cols-1 md:grid-cols-2">
          <h1> Dashboard </h1>
        </div>
      </div>
    </>
  );
}
