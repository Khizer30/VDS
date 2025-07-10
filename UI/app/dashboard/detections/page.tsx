import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import DetectionTable from "@components/Tables/DetectionTable";

export const metadata: Metadata = {
  title: "Detections | Vehicle Detection System"
};

// Detections Page
export default function Page(): ReactNode {
  return (
    <>
      <DetectionTable />
    </>
  );
}
