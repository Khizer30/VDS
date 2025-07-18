import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import VehicleTable from "@components/Tables/VehicleTable";

export const metadata: Metadata = {
  title: "Vehicles | Vehicle Detection System"
};

// Vehicles Page
export default function Page(): ReactNode {
  return (
    <>
      <VehicleTable />
    </>
  );
}
