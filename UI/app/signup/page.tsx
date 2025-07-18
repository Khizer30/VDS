import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import SignupForm from "@components/Forms/SignupForm";
import logo from "@images/logo.webp";

export const metadata: Metadata = {
  title: "Signup | Vehicle Detection System",
};

// Signup Page
export default function Page(): ReactNode {
  return (
    <>
      <div className="h-screen">
        <header className="flex h-1/6 items-center justify-start p-10">
          <Image
            src={logo}
            alt="VDH Logo"
            priority
            draggable={false}
            className="w-40"
          />
        </header>
        <div className="grid h-5/6 grid-cols-1 md:grid-cols-2">
          <SignupForm />
        </div>
      </div>
    </>
  );
}
