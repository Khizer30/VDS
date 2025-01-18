"use client";
import { ReactNode } from "react";

// Detection Interface
interface Detection
{
  licensePlate: string;
  model: string;
  colour: string;
  entry: string;
  exit: string;
}

// Detections
const detections: Detection[] =
  [
    {
      licensePlate: "AGH-786",
      model: "Honda City",
      colour: "White",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    },
    {
      licensePlate: "XYZ-123",
      model: "Honda Civic",
      colour: "Black",
      entry: "05/01/2025 07:45",
      exit: "05/01/2025 17:30"
    }
  ];

// Vehicle Histroy
export default function VehcileHistory(): ReactNode
{
  // Detection Mappter
  function mapper(x: Detection, i: number): ReactNode
  {
    return (
      <tr key={ i }>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.licensePlate } </td>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.model } </td>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.colour } </td>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.entry } </td>
        <td className=" w-40 p-3 font-secondary text-sm border border-quaternary"> { x.exit } </td>
      </tr>
    );
  }

  return (
    <>
      <div className=" overflow-auto">
        <table>
          <thead>
            <tr>
              <th className=" w-40 p-3 font-secondary text-sm text-white border border-quaternary bg-black"> License Plate </th>
              <th className=" w-40 p-3 font-secondary text-sm text-white border border-quaternary bg-black"> Model </th>
              <th className=" w-40 p-3 font-secondary text-sm text-white border border-quaternary bg-black"> Colour </th>
              <th className=" w-40 p-3 font-secondary text-sm text-white border border-quaternary bg-black"> Entry Timestamp </th>
              <th className=" w-40 p-3 font-secondary text-sm text-white border border-quaternary bg-black"> Exit Timestamp </th>
            </tr>
          </thead>
          <tbody>
            { detections.map(mapper) }
          </tbody>
        </table>
      </div>
    </>
  );
}