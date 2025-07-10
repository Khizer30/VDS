"use client";
import type { ReactNode } from "react";
//
import type { DetectionInterface } from "@models/types";

// Dashboard
export default function Dashboard(): ReactNode {
  // States
  const detection: DetectionInterface[] = [
    {
      id: 0,
      makeDetected: "Honda City",
      makeExpected: "Honda City",
      colourDetected: "Black",
      colourExpected: "Black",
      numberPlate: "ZZ106",
      timestamp: new Date(Date.now())
    }
  ];

  // Table Headingss
  const tableHeadings: string[] = ["Number Plate", "Make", "Colour", "Time", "Date"];

  // Heading Mapper
  function headingMapper(x: string): ReactNode {
    return (
      <th
        key={x}
        className="font-primary border border-gray-500 bg-gray-900 p-1 text-xs font-medium text-white md:p-2 md:text-sm"
      >
        {x}
      </th>
    );
  }

  // Format Date
  function formatDate(x: string): string[] {
    const arr: string[] = x.split("T");
    const date: string[] = arr[0].split("-");
    const time: string[] = arr[1].split(".");

    return [`${date[2]}/${date[1]}/${date[0]}`, time[0]];
  }

  // Row Mapper
  function rowMapper(x: DetectionInterface): ReactNode {
    const timestamp: string[] = formatDate(x.timestamp.toISOString());

    return (
      <tr key={x.id} className="even:bg-gray-100">
        <td className="font-primary h-10 border border-gray-500 bg-white px-1 text-xs md:px-2 md:text-sm">
          {x.numberPlate}
        </td>
        <td className="font-primary h-10 border border-gray-500 bg-white px-1 text-xs md:px-2 md:text-sm">
          {x.makeDetected}
        </td>
        <td className="font-primary h-10 border border-gray-500 bg-white px-1 text-xs md:px-2 md:text-sm">
          {x.colourDetected}
        </td>
        <td className="font-primary h-10 border border-gray-500 bg-white px-1 text-xs md:px-2 md:text-sm">
          {timestamp[1]}
        </td>
        <td className="font-primary h-10 border border-gray-500 bg-white px-1 text-xs md:px-2 md:text-sm">
          {timestamp[0]}
        </td>
      </tr>
    );
  }

  return (
    <>
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1 m-4 rounded-lg bg-gray-100"></div>

        <div className="col-span-1 m-4 flex flex-col items-center justify-center rounded-lg bg-gray-100">
          <h3 className="font-primary my-4 text-3xl font-medium"> Recent Detection </h3>
          <table className="my-4 w-5/6">
            <thead>
              <tr>{tableHeadings.map(headingMapper)}</tr>
            </thead>
            <tbody>{detection.map(rowMapper)}</tbody>
          </table>
        </div>

        <div className="col-span-1 m-4 rounded-lg bg-gray-100 md:col-span-2"></div>
      </div>
    </>
  );
}
