import type { ReactNode } from "react";
import type { Metadata } from "next";
import type { Detection } from "@prisma/client";
//
import { fetchDetections } from "@lib/server";

export const metadata: Metadata =
{
  title: "Detection History | Vehicle Detection System"
};

// Detection History Page
export default async function Page(): Promise<ReactNode>
{
  const detections: Detection[] = await fetchDetections(1);

  // Detection Mappter
  function detectionMapper(x: Detection, i: number): ReactNode
  {
    return (
      <tr key={ i }>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.make } </td>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.colour } </td>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.numberPlate } </td>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.timestamp.toLocaleString() } </td>
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