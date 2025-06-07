"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
//
import { useAuth } from "@components/AuthContext";
import { auth } from "@lib/supabase";
import logo from "@images/logo.webp";

// Navbar
export default function Navbar(): ReactNode
{
  const { user } = useAuth();

  // Logout
  async function logout(): Promise<void>
  {
    const { error } = await auth.signOut();

    if (!error)
    {
      redirect("/login");
    }
  }

  return (
    <>
      <aside className=" w-1/6 p-6 border-r-2">
        <div className=" my-4 flex justify-center items-center">
          <Image
            src={ logo }
            alt="VDH Logo"
            priority
            draggable={ false }
            className=" w-40"
          />
        </div>
        <nav className=" my-10">

          <Link href={ `/dashboard/${ user?.id }` } className=" w-full my-1 px-2 py-2 block font-secondary text-start text-sm menu">
            Dashboard
          </Link>

          <Link href="/dashboard/register" className=" w-full my-1 px-2 py-2 block font-secondary text-start text-sm menu">
            Register Vehicle
          </Link>

          <Link href="/dashboard/history" className=" w-full my-1 px-2 py-2 block font-secondary text-start text-sm menu">
            View Detection History
          </Link>

          <button onClick={ logout } className=" w-full my-1 px-2 py-2 block font-secondary text-start text-sm menu">
            Log Out
          </button>

        </nav>
      </aside>
    </>
  );
}