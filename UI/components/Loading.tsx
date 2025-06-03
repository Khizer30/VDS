import Image from "next/image";
import type { ReactNode } from "react";
//
import logo from "@images/logo.webp";

// Loading
export default function Loading(): ReactNode
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