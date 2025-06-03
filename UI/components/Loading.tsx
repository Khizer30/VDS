import Image from "next/image";
import type { ReactNode } from "react";
//
import logo from "@images/logo.webp";

// Props
interface Props
{
  header: boolean;
}

// Loading
export default function Loading({ header }: Props): ReactNode
{
  return (
    <>
      <div className={ ` w-screen ${ header ? "h-full" : "h-screen" } flex justify-center items-center` }>
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