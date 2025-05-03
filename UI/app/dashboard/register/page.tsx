import { ReactNode } from "react";
import { Metadata } from "next";
//
import RegisterForm from "@components/RegisterForm";
import { fetchMakeAndColour } from "@lib/server";
import type { MakesAndColoursInterface } from "@lib/interface";

export const metadata: Metadata =
{
  title: "Register Vehicle | Vehicle Detection System"
};

// Register Page
export default async function Page(): Promise<ReactNode>
{
  const { makes, colours }: MakesAndColoursInterface = await fetchMakeAndColour();

  return (
    <>
      <div className=" w-full h-full flex justify-center items-center">
        <RegisterForm makes={ makes } colours={ colours } />
      </div>
    </>
  );
}