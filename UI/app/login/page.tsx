import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import LoginForm from "@components/LoginForm";
import logo from "@images/logo.webp";

export const metadata: Metadata =
{
  title: "Login | Vehicle Detection System"
};

// Login Page
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
          <LoginForm />
        </div>
      </div>
    </>
  );
}