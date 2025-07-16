"use client";
import toast from "react-hot-toast";
import { useState, useEffect, type ReactNode } from "react";
import { redirect } from "next/navigation";
//
import Loader from "@components/Loader";
import { formatDate } from "@helpers/date";
import type { DetectionInterface, DetectionResponseInterface } from "@models/types";

// Detection Table
export default function DetectionTable(): ReactNode {
  // States
  const [loader, setLoader] = useState<boolean>(true);
  const [detections, setDetections] = useState<DetectionInterface[]>([]);

  // On Mount
  useEffect(() => {
    (async () => {
      const url: string = "/api/detections";

      const response: Response = await fetch(url, {
        mode: "same-origin",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const res: DetectionResponseInterface = await response.json();

      if (res.success) {
        setDetections(res.detections);
      } else {
        toast.error(res.message);
        redirect("/dashboard");
      }

      setLoader(false);
    })();
  }, []);

  // Table Headingss
  const tableHeadings: string[] = ["Number Plate", "Vehicle's Make", "Vehicle's Colour", "Time", "Date", "Type"];

  // Heading Mapper
  function headingMapper(x: string, i: number): ReactNode {
    return (
      <th
        key={x}
        className={`font-primary bg-gray-900 p-4 font-medium text-white ${i === 0 ? "rounded-tl-lg" : ""} ${i === 5 ? "rounded-tr-lg" : ""}`}
      >
        {x}
      </th>
    );
  }

  // Row Mapper
  function rowMapper(x: DetectionInterface): ReactNode {
    const timestamp: string[] = formatDate(x.timestamp.toString());

    return (
      <tr key={x.id} className="even:bg-gray-100">
        <td className="font-primary h-14 border border-gray-500 px-4"> {x.numberPlate} </td>
        <td
          className={`font-primary h-14 border border-gray-500 px-4 ${x.makeDetected !== x.makeExpected ? "bg-red-500 text-white" : ""}`}
        >
          {x.makeDetected}
        </td>
        <td
          className={`font-primary h-14 border border-gray-500 px-4 ${x.colourDetected !== x.colourExpected ? "bg-red-500 text-white" : ""}`}
        >
          {x.colourDetected}
        </td>
        <td className="font-primary h-14 border border-gray-500 px-4"> {timestamp[1]} </td>
        <td className="font-primary h-14 border border-gray-500 px-4"> {timestamp[0]} </td>
        <td className="font-primary h-14 border border-gray-500 px-4"> {x.type} </td>
      </tr>
    );
  }

  return (
    <>
      {loader && <Loader />}
      <div className="w-[95%] rounded-xl p-2 md:w-11/12 md:p-8 lg:w-5/6">
        <h1 className="font-primary mt-4 mb-8 text-center text-3xl font-medium"> View Detections </h1>
        <div className="h-[75vh] w-full overflow-x-scroll overflow-y-scroll">
          <table className="my-4 w-full table-auto">
            <thead>
              <tr>{tableHeadings.map(headingMapper)}</tr>
            </thead>
            <tbody>{detections.map(rowMapper)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
