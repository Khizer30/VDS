import { ReactNode } from "react";
import { Metadata } from "next";
//
import RegisterForm from "@components/RegisterForm";

export const metadata: Metadata =
{
  title: "Register Vehicle | Vehicle Detection System"
};

// Register Page
export default function Page(): ReactNode
{
  return (
    <>
      <div className=" w-full h-full flex justify-center items-center">
        <RegisterForm />
      </div>
    </>
  );
}