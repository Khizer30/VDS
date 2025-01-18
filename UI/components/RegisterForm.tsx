"use client";
import { ReactNode } from "react";

// Register Vehicle Form
export default function RegisterForm(): ReactNode
{
  return (
    <>
      <form
        action="#"
        method="post"
        className=" w-11/12 md:w-1/2"
      >

        <h1 className=" mt-2 mb-8 font-secondary font-bold text-center text-3xl"> Register Your Vehcile </h1>

        <div className=" my-2 flex flex-col">
          <label htmlFor="licensePlate" className=" my-1 font-secondary text-sm"> License Plate </label>
          <input
            name="licensePlate"
            type="text"
            autoFocus
            required
            maxLength={ 100 }
            placeholder="Enter Your Vehicle's License Plate"
            pattern="^[A-Z0-9\s-]+$"
            className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
          />
        </div>

        <div className=" my-2 flex flex-col">
          <label htmlFor="model" className=" my-1 font-secondary text-sm"> Model </label>
          <select
            name="model"
            required
            defaultValue="NONE"
            className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
          >
            <option disabled value="NONE" className=" hidden"> Select Your Vehicle's Model </option>
            <option value="Honda City"> Honda City </option>
            <option value="Honda Civic"> Honda Civic </option>
            <option value="Suzuki Mehran"> Suzuki Mehran </option>
          </select>
        </div>

        <div className=" my-2 flex flex-col">
          <label htmlFor="colour" className=" my-1 font-secondary text-sm"> Colour </label>
          <select
            name="colour"
            required
            defaultValue="NONE"
            className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
          >
            <option disabled value="NONE" className=" hidden"> Select Your Vehicle's Colour </option>
            <option value="black"> Black </option>
            <option value="white"> White </option>
            <option value="grey"> Grey </option>
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