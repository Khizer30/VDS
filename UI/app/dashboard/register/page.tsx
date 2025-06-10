import type { ReactNode } from "react";
import type { Metadata } from "next";
import type { Make, Colour } from "@prisma/client";
//
import RegisterForm from "@components/RegisterForm";
import { fetchMakeAndColour } from "@lib/server";

export const metadata: Metadata =
{
  title: "Register Vehicle | Vehicle Detection System"
};

// Register Page
export default async function Page(): Promise<ReactNode>
{
  const { makes, colours }: { makes: Make[], colours: Colour[]; } = await fetchMakeAndColour();

  return (
    <>
      <div className=" w-full h-full flex justify-center items-center">
        <RegisterForm makes={ makes } colours={ colours } />
      </div>
    </>
  );
}