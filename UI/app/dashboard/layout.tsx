import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
//
import logo from "@images/logo.webp";

// Props
interface Props
{
  children: ReactNode;
}

// Dashboard Layout
export default function Layout({ children }: Props): ReactNode
{
  return (
    <>
      <div className=" h-screen flex">

        <aside className=" w-64 p-4 border-r-2">
          <div className=" my-4 flex justify-center items-center">
            <Image
              src={ logo }
              alt="VDH Logo"
              draggable={ false }
              className=" w-40"
            />
          </div>
          <nav className=" my-10">

            <Link href="/dashboard" className=" my-1 px-2 py-2 block font-secondary text-sm menu">
              Dashboard
            </Link>

            <Link href="/dashboard/register" className=" my-1 px-2 py-2 block font-secondary text-sm menu">
              Register Vehicle
            </Link>

            <Link href="/dashboard/history" className=" my-1 px-2 py-2 block font-secondary text-sm menu">
              View Detection History
            </Link>

            <Link href="#" className=" my-1 px-2 py-2 block font-secondary text-sm menu">
              Log Out
            </Link>

          </nav>
        </aside>

        <main className="flex-1 p-6">
          { children }
        </main>

      </div>
    </>
  );
}