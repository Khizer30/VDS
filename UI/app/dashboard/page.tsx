import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata =
{
  title: "Dashboard | Vehicle Detection System"
};

// Dashboard Page
export default function Page(): ReactNode
{
  return (
    <>
      <div className=" w-full h-full p-6 flex justify-start items-start">
        <div className=" w-96 h-48 m-2 flex flex-col justify-center items-center rounded-xl bg-quaternary">
          <h6 className=" m-2 font-secondary font-bold text-3xl"> Assalam Wallikum, </h6>
          <h6 className=" m-2 font-secondary text-3xl"> Khizer </h6>
        </div>

        <div className=" w-96 h-48 m-2 flex flex-col justify-center items-center rounded-xl bg-quaternary">
          <h6 className=" m-2 font-secondary font-bold text-3xl"> Last Entry Time </h6>
          <p className=" m-2 font-secondary text-lg"> 10/02/2025, 4:00:00 pm </p>
        </div>
      </div>
    </>
  );
}