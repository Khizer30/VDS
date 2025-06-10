"use client";
import { useState, useEffect, type ReactNode } from "react";
import { redirect } from "next/navigation";
import type { Make, Colour, Vehicle, Detection } from "@prisma/client";
//
import Loading from "@components/Loading";
import { useAuth } from "@components/AuthContext";
import { fetchRecentDetection, fetchMakeAndColour } from "@lib/server";
import { displayTime } from "@lib/time";

// Dashboard
export default function Dashboard(): ReactNode
{
  // Hooks
  const { user, loading } = useAuth();

  // On Mount
  useEffect(() =>
  {
    (async () =>
    {
      if (user && user.email)
      {
        const { makes, colours } = await fetchMakeAndColour();
        const { name, detection, vehicles } = await fetchRecentDetection(user.email);

        setMakes(makes);
        setColours(colours);
        setName(name);
        setDetection(detection);
        setVehicles(vehicles);
      }
    })();
  }, [user]);

  // States
  const [makes, setMakes] = useState<Make[]>([]);
  const [colours, setColours] = useState<Colour[]>([]);
  const [name, setName] = useState<string>("");
  const [detection, setDetection] = useState<Detection | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Show Loading
  if (loading)
  {
    return (
      <>
        <Loading wScreen={ false } hScreen={ false } />
      </>
    );
  }

  // Redirect
  if (!user)
  {
    redirect("/login");
  }

  // Vehicle Mappter
  function vehicleMapper(x: Vehicle, i: number): ReactNode
  {
    return (
      <tr key={ i }>
        <td className=" w-1/3 p-2 font-secondary text-sm border border-quaternary bg-white"> { finder("make", x.makeID) } </td>
        <td className=" w-1/3 p-2 font-secondary text-sm border border-quaternary bg-white"> { finder("colour", x.colourID) } </td>
        <td className=" w-1/3 p-2 font-secondary text-sm border border-quaternary bg-white"> { x.numberPlate } </td>
      </tr>
    );
  }

  // Finder
  function finder(type: string, id: number): string
  {
    if (type === "make")
    {
      const make: Make | undefined = makes.find((v: Make) => v.id === id);

      return make ? make.name : "";
    }
    else
    {
      const colour: Colour | undefined = colours.find((v: Colour) => v.id === id);

      return colour ? colour.name : "";
    }
  }

  return (
    <>
      <div className=" w-full h-full p-3 md:p-6 grid grid-cols-1 md:grid-cols-2 justify-items-center items-start">
        <div className=" w-5/6 m-2 p-6 col-span-1 flex flex-col justify-center items-center rounded-xl bg-quaternary">
          <h6 className=" m-2 font-secondary font-bold text-center text-3xl"> Assalam Wallikum </h6>
          <h6 className=" m-2 font-secondary text-center text-xl"> { name || <br /> } </h6>
        </div>

        <div className=" w-5/6 m-2 p-6 col-span-1 flex flex-col justify-center items-center rounded-xl bg-quaternary">
          <h6 className=" m-2 font-secondary font-bold text-center text-3xl"> Recent Detection </h6>
          <p className=" m-2 font-secondary text-center text-lg"> { detection ? detection.numberPlate : ". . ." } { detection ? detection.make : ". . ." } </p>
          <p className=" m-2 font-secondary text-center"> { detection ? displayTime(detection.timestamp) : ". . ." } </p>
        </div>

        <div className=" w-5/6 m-2 p-6 col-span-1 md:col-span-2 flex flex-col justify-center items-center rounded-xl bg-quaternary">
          <h6 className=" m-2 font-secondary font-bold text-center text-3xl"> Registered Vehicles </h6>
          <div className=" w-full m-2 overflow-auto">
            <table className=" w-full">
              <thead>
                <tr>
                  <th className=" w-1/3 p-2 font-secondary text-sm text-white border border-quaternary bg-black"> Model </th>
                  <th className=" w-1/3 p-2 font-secondary text-sm text-white border border-quaternary bg-black"> Colour </th>
                  <th className=" w-1/3 p-2 font-secondary text-sm text-white border border-quaternary bg-black"> License Plate </th>
                </tr>
              </thead>
              <tbody>
                { vehicles.map(vehicleMapper) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}