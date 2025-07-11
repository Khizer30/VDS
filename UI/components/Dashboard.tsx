"use client";
import { useState, useEffect, type ReactNode } from "react";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Legend, Title } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
//
import { formatDate } from "@helpers/date";
import type { DetectionInterface, DailyDetectionsInterface } from "@models/types";

// Chart.JS
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Legend, Title);

// Detections
const detections: DetectionInterface[] = [
  {
    id: 0,
    makeDetected: "Honda City",
    makeExpected: "Honda City",
    colourDetected: "Black",
    colourExpected: "Black",
    numberPlate: "ZZ106",
    timestamp: new Date(Date.now())
  },
  {
    id: 1,
    makeDetected: "Honda City",
    makeExpected: "Suzuki Mehran",
    colourDetected: "Black",
    colourExpected: "Black",
    numberPlate: "ZZ106",
    timestamp: new Date(Date.now())
  },
  {
    id: 2,
    makeDetected: "Honda City",
    makeExpected: "Suzuki Mehran",
    colourDetected: "Black",
    colourExpected: "Black",
    numberPlate: "ZZ106",
    timestamp: new Date(Date.now())
  },
  {
    id: 3,
    makeDetected: "Honda City",
    makeExpected: "Honda City",
    colourDetected: "Black",
    colourExpected: "White",
    numberPlate: "ZZ106",
    timestamp: new Date(Date.now())
  },
  {
    id: 4,
    makeDetected: "Honda City",
    makeExpected: "Honda City",
    colourDetected: "Black",
    colourExpected: "White",
    numberPlate: "ZZ106",
    timestamp: new Date(Date.now())
  }
];

// Daily Detections
const dailyDetections: DailyDetectionsInterface = {
  labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
  quantity: [20, 16, 20, 21, 13, 0, 0]
};

// Dashboard
export default function Dashboard(): ReactNode {
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
    const timestamp: string[] = formatDate(x.timestamp.toISOString());

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
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1 m-4 flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 md:p-4">
          <Line
            data={{
              labels: dailyDetections.labels,
              datasets: [
                {
                  label: "No. of Detections",
                  data: dailyDetections.quantity,
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

        <div className="col-span-1 m-4 flex flex-col items-center justify-center rounded-lg bg-gray-100 p-2 md:p-16">
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
                  text: "Today's Detected Vehicles",
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
