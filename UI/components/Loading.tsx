import Image from "next/image";
import type { ReactNode } from "react";
//
import logo from "@images/logo.webp";

// Props
interface Props
{
  wScreen: boolean;
  hScreen: boolean;
}

// Loading
export default function Loading({ wScreen, hScreen }: Props): ReactNode
{
  return (
    <>
      <div className={ ` ${ wScreen ? "w-screen" : "w-full" } ${ hScreen ? "h-screen" : "h-full" } flex justify-center items-center` }>
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