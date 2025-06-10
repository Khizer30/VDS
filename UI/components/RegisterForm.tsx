"use client";
import { useState, useEffect, type ReactNode, type ChangeEvent, type FormEvent } from "react";
import { redirect } from "next/navigation";
import type { Make, Colour, Vehicle } from "@prisma/client";
//
import Loading from "@components/Loading";
import validate from "@lib/validate";
import { useAuth } from "@components/AuthContext";
import { fetchMakeAndColour } from "@lib/server";
import { vehicleObj } from "@lib/objects";
import type { ResponseInterface } from "@lib/interface";

// Register Vehicle Form
export default function RegisterForm(): ReactNode
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

        setMakes(makes);
        setColours(colours);
      }
    })();
  }, [user]);

  // States
  const [makes, setMakes] = useState<Make[]>([]);
  const [colours, setColours] = useState<Colour[]>([]);
  const [inputs, setInputs] = useState<Vehicle>(vehicleObj);
  const [alert, setAlert] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  // Show Loading
  if (loading)
  {
    return (
      <>
        <Loading wScreen={ true } hScreen={ false } />
      </>
    );
  }

  // Redirect
  if (!user)
  {
    redirect("/login");
  }

  // Handle Change
  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void
  {
    setInputs((x: Vehicle) => ({ ...x, [e.target.name]: e.target.value }));
  }

  // Handle Submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void>
  {
    e.preventDefault();

    if (validateInputs() && user)
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
          body: JSON.stringify({ email: user.email, makeID: inputs.makeID, colourID: inputs.colourID, numberPlate: inputs.numberPlate })
        });

      const res: ResponseInterface = await response.json();

      if (res.success)
      {
        setAlert(false);
        setMessage(res.message);

        setInputs(vehicleObj);
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
    const list: string[] = ["makeID", "colourID", "numberPlate"];

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

  // Option Mapper
  function optionMapper(x: Make | Colour): ReactNode
  {
    return (
      <option value={ x.id } key={ x.id }> { x.name } </option>
    );
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

        <p
          data-testid="message"
          className={ (message ? "" : " invisible") + (alert ? " bg-red" : " bg-green") + " py-3 font-secondary text-sm text-center text-white rounded transition-all duration-300 hover:scale-95" }
        >
          { message || <br /> }
        </p>

        <div className=" my-2 flex flex-col">
          <label htmlFor="makeID" className=" my-1 font-secondary text-sm"> Make & Model </label>
          <select
            name="makeID"
            data-testid="makeID"
            autoFocus
            required
            className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
            value={ inputs.makeID }
            onChange={ handleChange }
          >
            <option disabled value={ 0 } className=" hidden"> Select Your Vehicle's Make & Model </option>
            { makes.map(optionMapper) }
          </select>
        </div>

        <div className=" my-2 flex flex-col">
          <label htmlFor="colourID" className=" my-1 font-secondary text-sm"> Colour </label>
          <select
            name="colourID"
            data-testid="colourID"
            required
            className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
            value={ inputs.colourID }
            onChange={ handleChange }
          >
            <option disabled value={ 0 } className=" hidden"> Select Your Vehicle's Colour </option>
            { colours.map(optionMapper) }
          </select>
        </div>

        <div className=" my-2 flex flex-col">
          <label htmlFor="numberPlate" className=" my-1 font-secondary text-sm"> Number Plate </label>
          <input
            name="numberPlate"
            data-testid="numberPlate"
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
            data-testid="submit"
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