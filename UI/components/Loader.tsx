import Image from "next/image";
import type { ReactNode } from "react";
//
import logo from "@images/logo.webp";

// Loader
export default function Loader(): ReactNode {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <Image src={logo} alt="VDH Logo" draggable={false} className="w-80 animate-pulse md:w-96" />
    </div>
  );
}
