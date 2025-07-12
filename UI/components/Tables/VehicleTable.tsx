"use client";
import toast from "react-hot-toast";
import { useState, useEffect, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
//
import Loader from "@components/Loader";
import type {
  ResponseInterface,
  VehicleInterface,
  VehiclesResponseInterface,
  RemoveVehicleInterface
} from "@models/types";

// Vehicle Table
export default function VehicleTable(): ReactNode {
  // States
  const [loader, setLoader] = useState<boolean>(true);
  const [vehicles, setVehicles] = useState<VehicleInterface[]>([]);

  // On Mount
  useEffect(() => {
    (async () => {
      const url: string = "/api/vehicles";

      const response: Response = await fetch(url, {
        mode: "same-origin",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const res: VehiclesResponseInterface = await response.json();

      if (res.success) {
        setVehicles(res.vehicles);
      } else {
        toast.error(res.message);
        redirect("/dashboard");
      }

      setLoader(false);
    })();
  }, []);

  // Remove Vehicle
  async function removeVehicle(id: number): Promise<void> {
    const url: string = "/api/remove-vehicle";
    setLoader(true);

    const response: Response = await fetch(url, {
      mode: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ vehicleID: id } as RemoveVehicleInterface)
    });

    let res: ResponseInterface = await response.json();

    if (res.success) {
      toast.success(res.message);

      const tempVehicles: VehicleInterface[] = [];

      for (let i: number = 0; i < vehicles.length; i++) {
        if (vehicles[i].id !== id) {
          tempVehicles.push(vehicles[i]);
        }
      }

      setVehicles(tempVehicles);
    } else {
      toast.error(res.message);
    }

    setLoader(false);
  }

  // Table Headingss
  const tableHeadings: string[] = ["Owner's Name", "Vehicle's Make", "Vehicle's Colour", "Number Plate", "Delete"];

  // Heading Mapper
  function headingMapper(x: string, i: number): ReactNode {
    return (
      <th
        key={x}
        className={`font-primary bg-gray-900 p-4 font-medium text-white ${i === 0 ? "rounded-tl-lg" : ""} ${i === 4 ? "rounded-tr-lg" : ""}`}
      >
        {x}
      </th>
    );
  }

  // Row Mapper
  function rowMapper(x: VehicleInterface): ReactNode {
    return (
      <tr key={x.id} className="even:bg-gray-100">
        <td className="font-primary h-14 border border-gray-500 px-4"> {x.owner} </td>
        <td className="font-primary h-14 border border-gray-500 px-4"> {x.make} </td>
        <td className="font-primary h-14 border border-gray-500 px-4"> {x.colour} </td>
        <td className="font-primary h-14 border border-gray-500 px-4"> {x.numberPlate} </td>
        <td className="font-primary flex h-14 items-center justify-center border-r border-b border-gray-500 px-4">
          <button
            onClick={() => removeVehicle(x.id)}
            className="cursor-pointer rounded-lg p-2 text-gray-900 transition-all hover:bg-gray-500 hover:text-white active:bg-gray-900"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>
    );
  }

  return (
    <>
      {loader && <Loader />}
      <div className="w-[95%] rounded-xl p-2 md:w-11/12 md:p-8 lg:w-5/6">
        <h1 className="font-primary mt-4 mb-8 text-center text-3xl font-medium"> View Vehicles </h1>
        <div className="h-[75vh] w-full overflow-x-scroll overflow-y-scroll">
          <table className="my-4 w-full table-auto">
            <thead>
              <tr>{tableHeadings.map(headingMapper)}</tr>
            </thead>
            <tbody>{vehicles.map(rowMapper)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
