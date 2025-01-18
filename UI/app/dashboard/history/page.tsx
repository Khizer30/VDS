import { ReactNode } from "react";
import { Metadata } from "next";
//
import VehcileHistory from "@components/VehicleHistory";

export const metadata: Metadata =
{
  title: "Detection History | Vehicle Detection System"
};

// Dashboard Page
export default function Page(): ReactNode
{
  return (
    <>
      <div className=" w-full h-full flex flex-col justify-center items-center">
        <h1 className=" mt-2 mb-8 font-secondary font-bold text-center text-3xl"> View Your Vehicle's Detections </h1>
        <VehcileHistory />
      </div>
    </>
  );
}