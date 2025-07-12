"use client";
import toast from "react-hot-toast";
import { useState, useEffect, type ReactNode } from "react";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Legend, Title } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
//
import Loader from "@components/Loader";
import { formatDate } from "@helpers/date";
import type { DetectionInterface, DailyDetectionsInterface, DashboardResponseInterface } from "@models/types";

// Chart.JS
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Legend, Title);

// Dashboard
export default function Dashboard(): ReactNode {
  // States
  const [loader, setLoader] = useState<boolean>(true);
  const [dailyDetections, setDailyDetections] = useState<DailyDetectionsInterface>({ days: [], counts: [] });
  const [detections, setDetections] = useState<DetectionInterface[]>([]);

  // On Mount
  useEffect(() => {
    (async () => {
      const url: string = "/api/dashboard";

      const response: Response = await fetch(url, {
        mode: "same-origin",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const res: DashboardResponseInterface = await response.json();

      if (res.success) {
        setDailyDetections(res.dailyDetections);
        setDetections(res.detections);
      } else {
        toast.error(res.message);
      }

      setLoader(false);
    })();
  }, []);

  // Check Detection
  function isSuspiciousDetection(detection: DetectionInterface) {
    if (detection.makeDetected !== detection.makeExpected) {
      return true;
    } else if (detection.colourDetected !== detection.colourExpected) {
      return true;
    } else {
      return false;
    }
  }

  // Split Detections
  function splitDetections(arr: DetectionInterface[]): number[] {
    let registerdCount: number = 0;
    let suspiciousCount: number = 0;

    for (let i: number = 0; i < arr.length; i++) {
      if (isSuspiciousDetection(arr[i])) {
        suspiciousCount++;
      } else {
        registerdCount++;
      }
    }

    return [registerdCount, suspiciousCount];
  }

  // Table Headingss
  const tableHeadings: string[] = ["Number Plate", "Vehicle's Make", "Vehicle's Colour", "Time", "Date"];

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

  // Row Mapper
  function rowMapper(x: DetectionInterface): ReactNode {
    const timestamp: string[] = formatDate(x.timestamp.toString());

    return (
      <tr key={x.id} className="even:bg-gray-100">
        <td className="font-primary h-10 border border-gray-500 bg-white px-1 text-xs md:px-2 md:text-sm">
          {x.numberPlate}
        </td>
        <td
          className={`font-primary h-10 border border-gray-500 px-1 text-xs md:px-2 md:text-sm ${x.makeDetected !== x.makeExpected ? "bg-red-500 text-white" : "bg-white text-black"}`}
        >
          {x.makeDetected}
        </td>
        <td
          className={`font-primary h-10 border border-gray-500 px-1 text-xs md:px-2 md:text-sm ${x.colourDetected !== x.colourExpected ? "bg-red-500 text-white" : "bg-white text-black"}`}
        >
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
      {loader && <Loader />}
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1 m-4 flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 md:p-4">
          <Line
            data={{
              labels: dailyDetections.days,
              datasets: [
                {
                  label: "No. of Detections",
                  data: dailyDetections.counts,
                  borderColor: "#51A2FF",
                  backgroundColor: "#51A2FF",
                  tension: 0.3,
                  fill: true
                }
              ]
            }}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Daily Detections",
                  color: "#364153",
                  font: {
                    size: 14,
                    family: "Roboto Variable, sans-serif"
                  }
                },
                legend: {
                  position: "bottom",
                  labels: {
                    color: "#364153",
                    font: {
                      size: 12,
                      family: "Roboto Variable, sans-serif"
                    }
                  }
                }
              }
            }}
          />
        </div>

        <div className="col-span-1 m-4 flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 md:p-4">
          <div className="flex h-full w-full items-center justify-center md:h-3/4 md:w-3/4">
            <Doughnut
              data={{
                labels: ["Registered Vehicles", "Suspicious Vehicles"],
                datasets: [
                  {
                    data: splitDetections(detections),
                    backgroundColor: ["#51A2FF", "#FF6467"],
                    borderColor: ["#51A2FF", "#FF6467"],
                    borderWidth: 1,
                    hoverOffset: 7
                  }
                ]
              }}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Recent Detected Vehicles",
                    color: "#364153",
                    font: {
                      size: 14,
                      family: "Roboto Variable, sans-serif"
                    }
                  },
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#364153",
                      font: {
                        size: 12,
                        family: "Roboto Variable, sans-serif"
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="col-span-1 m-4 flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 md:col-span-2 md:p-4">
          <h3 className="font-primary my-4 text-center text-xl font-medium md:text-3xl"> Suspicious Detections </h3>
          <table className="my-4 w-5/6">
            <thead>
              <tr>{tableHeadings.map(headingMapper)}</tr>
            </thead>
            <tbody>{detections.filter(isSuspiciousDetection).map(rowMapper)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
