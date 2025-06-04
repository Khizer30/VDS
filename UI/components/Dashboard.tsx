"use client";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
//
import Loading from "@components/Loading";
import { useAuth } from "@components/AuthContext";

// Dashboard
export default function Dashboard(): ReactNode
{
  const { user, loading } = useAuth();

  // Show Loading
  if (loading)
  {
    return (
      <>
        <Loading wScreen={ false } hScreen={ false } />
      </>
    );
  }

  // Redirect
  if (!user)
  {
    redirect("/login");
  }

  return (
    <>
      <div className=" w-full h-full p-6 flex justify-start items-start">
        <div className=" w-96 h-48 m-2 flex flex-col justify-center items-center rounded-xl bg-quaternary">
          <h6 className=" m-2 font-secondary font-bold text-3xl"> Assalam Wallikum, </h6>
          <h6 className=" m-2 font-secondary text-xl"> { user.name } </h6>
        </div>

        <div className=" w-96 h-48 m-2 flex flex-col justify-center items-center rounded-xl bg-quaternary">
          <h6 className=" m-2 font-secondary font-bold text-3xl"> Last Entry Time </h6>
          <p className=" m-2 font-secondary text-lg"> 10/02/2025, 4:00:00 pm </p>
        </div>
      </div>
    </>
  );
}