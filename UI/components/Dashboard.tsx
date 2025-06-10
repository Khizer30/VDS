"use client";
import { useState, useEffect, type ReactNode } from "react";
import { redirect } from "next/navigation";
import type { Detection } from "@prisma/client";
//
import Loading from "@components/Loading";
import { useAuth } from "@components/AuthContext";
import { fetchRecentDetection } from "@lib/server";
import { displayTime } from "@lib/time";

// Dashboard
export default function Dashboard(): ReactNode
{
  // Hooks
  const { user, loading } = useAuth();

  // On Mount
  useEffect(() =>
  {
    (async () =>
    {
      if (user && user.email)
      {
        const { name: newName, detection: newDetection } = await fetchRecentDetection(user.email);

        setName(newName);
        setDetection(newDetection);
      }
    })();
  }, [user]);

  // States
  const [name, setName] = useState<string>("");
  const [detection, setDetection] = useState<Detection | null>(null);

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
          <h6 className=" m-2 font-secondary font-bold text-3xl"> Assalam Wallikum </h6>
          <h6 className=" m-2 font-secondary text-xl"> { name || <br /> } </h6>
        </div>

        <div className=" w-96 h-48 m-2 flex flex-col justify-center items-center rounded-xl bg-quaternary">
          <h6 className=" m-2 font-secondary font-bold text-3xl"> Recent Detection </h6>
          <p className=" m-2 font-secondary text-lg"> { detection ? displayTime(detection.timestamp) : ". . ." } </p>
        </div>
      </div>
    </>
  );
}