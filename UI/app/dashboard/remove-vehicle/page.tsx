import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import RemoveVehicleForm from "@components/Forms/RemoveVehicleForm";

export const metadata: Metadata = {
  title: "Register Vehicle | Vehicle Detection System"
};

// Register Vehicle Page
export default function Page(): ReactNode {
  return (
    <>
      <RemoveVehicleForm />
    </>
  );
}
