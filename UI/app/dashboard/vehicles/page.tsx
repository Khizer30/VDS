import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import VehiclesForm from "@components/Forms/VehiclesForm";

export const metadata: Metadata = {
  title: "Vehicles | Vehicle Detection System"
};

// Vehicles Page
export default function Page(): ReactNode {
  return (
    <>
      <VehiclesForm />
    </>
  );
}
