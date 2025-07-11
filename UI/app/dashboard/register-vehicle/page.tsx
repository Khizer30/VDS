import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import RegisterVehicleForm from "@components/Forms/RegisterVehicleForm";

export const metadata: Metadata = {
  title: "Register Vehicle | Vehicle Detection System"
};

// Register Vehicle Page
export default function Page(): ReactNode {
  return (
    <>
      <RegisterVehicleForm />
    </>
  );
}
