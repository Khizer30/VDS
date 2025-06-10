"use client";
import { useState, useEffect, type ReactNode } from "react";
import { redirect } from "next/navigation";
import type { Detection } from "@prisma/client";
//
import Loading from "./Loading";
import { useAuth } from "@components/AuthContext";
import { fetchDetections } from "@lib/server";
import { displayTime } from "@lib/time";

// History
export default function History(): ReactNode
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
        let tempDetections = await fetchDetections(user.email);

        setDetections(tempDetections);
      }
    })();
  }, [user]);

  // States
  const [detections, setDetections] = useState<Detection[]>([]);

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

  // Detection Mappter
  function detectionMapper(x: Detection, i: number): ReactNode
  {
    return (
      <tr key={ i }>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.make } </td>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.colour } </td>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.numberPlate } </td>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { displayTime(x.timestamp) } </td>
      </tr>
    );
  }

  return (
    <>
      <div className=" w-full h-full flex flex-col justify-center items-center">
        <h1 className=" mt-2 mb-8 font-secondary font-bold text-center text-3xl"> View Your Vehicle's Detections </h1>
        <div className=" overflow-auto">
          <table>
            <thead>
              <tr>
                <th className=" w-40 p-3 font-secondary text-sm text-white border border-quaternary bg-black"> Model </th>
                <th className=" w-40 p-3 font-secondary text-sm text-white border border-quaternary bg-black"> Colour </th>
                <th className=" w-40 p-3 font-secondary text-sm text-white border border-quaternary bg-black"> License Plate </th>
                <th className=" w-40 p-3 font-secondary text-sm text-white border border-quaternary bg-black"> Timestamp </th>
              </tr>
            </thead>
            <tbody>
              { detections.map(detectionMapper) }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}