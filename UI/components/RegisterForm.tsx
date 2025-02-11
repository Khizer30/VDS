"use client";
import { useState, type ReactNode, type ChangeEvent, type FormEvent } from "react";
import type { Vehicle } from "@prisma/client";

const vehicleObj: Vehicle =
{
  id: 0,
  make: "",
  colour: "",
  numberPlate: "",
  userID: 0
};

// Register Vehicle Form
export default function RegisterForm(): ReactNode
{
  const [inputs, setInputs] = useState<Vehicle>(vehicleObj);

  // Handle Change
  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void
  {
    setInputs((x: Vehicle) => ({ ...x, [e.target.name]: e.target.value }));
  }

  // Handle Submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void>
  {
    e.preventDefault();

    const res: Response = await fetch("/api/register",
      {
        mode: "same-origin",
        cache: "no-cache",
        method: "POST",
        headers:
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      });
  }

  return (
    <>
      <form
        method="post"
        autoComplete="off"
        className=" w-11/12 md:w-1/2"
        onSubmit={ handleSubmit }
      >

        <h1 className=" mt-2 mb-8 font-secondary font-bold text-center text-3xl"> Register Your Vehcile </h1>

        <div className=" my-2 flex flex-col">
          <label htmlFor="numberPlate" className=" my-1 font-secondary text-sm"> Number Plate </label>
          <input
            name="numberPlate"
            type="text"
            autoFocus
            required
            maxLength={ 100 }
            placeholder="Enter Your Vehicle's Number Plate"
            className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
            onChange={ handleChange }
          />
        </div>

        <div className=" my-2 flex flex-col">
          <label htmlFor="make" className=" my-1 font-secondary text-sm"> Make & Model </label>
          <select
            name="make"
            required
            defaultValue="NONE"
            className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
            onChange={ handleChange }
          >
            <option disabled value="NONE" className=" hidden"> Select Your Vehicle's Make & Model </option>
            <option value="Honda City"> Honda City </option>
            <option value="Suzuki Alto"> Suzuki Alto </option>
            <option value="Suzuki Mehran"> Suzuki Mehran </option>
            <option value="Toyota Corolla"> Toyota Corolla </option>
          </select>
        </div>

        <div className=" my-2 flex flex-col">
          <label htmlFor="colour" className=" my-1 font-secondary text-sm"> Colour </label>
          <select
            name="colour"
            required
            defaultValue="NONE"
            className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
            onChange={ handleChange }
          >
            <option disabled value="NONE" className=" hidden"> Select Your Vehicle's Colour </option>
            <option value="Black"> Black </option>
            <option value="Silver"> Silver </option>
            <option value="White"> White </option>
          </select>
        </div>

        <div className=" mt-4 mb-2 ">
          <button
            type="submit"
            className=" w-full my-4 p-3 font-secondary text-sm btn"
          >
            Register
          </button>
        </div>

      </form>
    </>
  );
}