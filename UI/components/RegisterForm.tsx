"use client";
import { useState, type ReactNode, type ChangeEvent, type FormEvent } from "react";
//
import validate from "@lib/validate";
import { registerVehicleInputsObj } from "@lib/objects";
import type { ResponseInterface, RegisterVehicleInputsInterface } from "@lib/interface";

// Register Vehicle Form
export default function RegisterForm(): ReactNode
{
  const [inputs, setInputs] = useState<RegisterVehicleInputsInterface>(registerVehicleInputsObj);
  const [alert, setAlert] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  // Handle Change
  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void
  {
    setInputs((x: RegisterVehicleInputsInterface) => ({ ...x, [e.target.name]: e.target.value }));
  }

  // Handle Submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void>
  {
    e.preventDefault();

    if (validateInputs())
    {
      const response: Response = await fetch("/api/register",
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

      const res: ResponseInterface = await response.json();

      if (res.success)
      {
        setAlert(false);
        setMessage(res.message);

        setInputs(registerVehicleInputsObj);
      }
      else
      {
        setAlert(true);
        setMessage(res.message);
      }
    }
  }

  // Validate Inputs
  function validateInputs(): boolean
  {
    let valid: boolean = true;
    const list: string[] = ["make", "colour", "numberPlate"];

    setAlert(true);
    setMessage("");

    for (let i: number = 0; i < list.length; i++)
    {
      const res: ResponseInterface = validate(list[i], inputs[list[i]]);

      if (!res.success)
      {
        valid = false;

        setAlert(true);
        setMessage(res.message);

        break;
      }
    }

    return valid;
  }

  return (
    <>
      <form
        method="post"
        autoComplete="off"
        noValidate
        className=" w-11/12 md:w-1/2"
        onSubmit={ handleSubmit }
      >

        <h1 className=" mt-2 mb-8 font-secondary font-bold text-center text-3xl"> Register Your Vehcile </h1>

        <p className={ (message ? "" : " invisible") + (alert ? " bg-red" : " bg-green") + " py-3 font-secondary text-sm text-center text-white rounded transition-all duration-300 hover:scale-95" }> { message || <br /> } </p>

        <div className=" my-2 flex flex-col">
          <label htmlFor="make" className=" my-1 font-secondary text-sm"> Make & Model </label>
          <select
            name="make"
            autoFocus
            required
            className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
            value={ inputs.make }
            onChange={ handleChange }
          >
            <option disabled value="" className=" hidden"> Select Your Vehicle's Make & Model </option>
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
            className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
            value={ inputs.colour }
            onChange={ handleChange }
          >
            <option disabled value="" className=" hidden"> Select Your Vehicle's Colour </option>
            <option value="Black"> Black </option>
            <option value="Silver"> Silver </option>
            <option value="White"> White </option>
          </select>
        </div>

        <div className=" my-2 flex flex-col">
          <label htmlFor="numberPlate" className=" my-1 font-secondary text-sm"> Number Plate </label>
          <input
            name="numberPlate"
            type="text"
            required
            maxLength={ 100 }
            placeholder="Enter Your Vehicle's Number Plate"
            className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
            value={ inputs.numberPlate }
            onChange={ handleChange }
          />
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