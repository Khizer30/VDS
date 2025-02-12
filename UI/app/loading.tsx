import Image from "next/image";
import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import logo from "@images/logo.webp";

export const metadata: Metadata =
{
  title: "Loading... | Vehicle Detection System"
};

// Loading Page
export default function Page(): ReactNode
{
  return (
    <>
      <div className=" w-screen h-screen flex justify-center items-center">
        <Image
          src={ logo }
          alt="VDH Logo"
          draggable={ false }
          className=" w-96 animate-pulse"
        />
      </div>
    </>
  );
}
