import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import SignupForm from "@components/SignupForm";
import logo from "@images/logo.webp";

export const metadata: Metadata =
{
  title: "Signup | Vehicle Detection System"
};

// Signup Page
export default function Page(): ReactNode
{
  return (
    <>
      <div className=" h-screen">
        <header className=" h-1/6 p-10 flex justify-start items-center">
          <Image
            src={ logo }
            alt="VDH Logo"
            draggable={ false }
            className=" w-40"
          />
        </header>
        <div className=" h-5/6 grid grid-cols-1 md:grid-cols-2">
          <SignupForm />
        </div>
      </div>
    </>
  );
}