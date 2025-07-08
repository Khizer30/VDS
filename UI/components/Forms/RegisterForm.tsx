"use client";
import toast from "react-hot-toast";
import { useState, useEffect, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import type { User, Make, Colour } from "@app/generated/prisma";
//
import Loader from "@components/Loader";
import type { ResponseInterface, RegisterInterface, RegisterResponseInterface } from "@models/types";

// Register Form
export default function RegisterForm(): ReactNode {
  // States
  const [loader, setLoader] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [makes, setMakes] = useState<Make[]>([]);
  const [colours, setColours] = useState<Colour[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, touchedFields }
  } = useForm<RegisterInterface>({
    mode: "onTouched",
    defaultValues: { ownerID: "0", makeID: "0", colourID: "0", numberPlate: "" }
  });

  // On Mount
  useEffect(() => {
    (async () => {
      const url: string = "/api/register-vehicle";

      const response: Response = await fetch(url, {
        mode: "same-origin",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      let res: RegisterResponseInterface = await response.json();

      if (res.success) {
        setUsers(res.users);
        setMakes(res.makes);
        setColours(res.colours);
      } else {
        toast.error(res.message);
        redirect("/dashboard");
      }

      setLoader(false);
    })();
  }, []);

  // On Submit
  const onSubmit: SubmitHandler<RegisterInterface> = (data: RegisterInterface) => {
    registerVehicle(data);
  };

  // On Error
  const onError = () => {
    toast.error("Please enter valid details");

    for (let fieldName in getValues()) {
      // @ts-ignore
      setValue(fieldName, getValues(fieldName), { shouldTouch: true });
    }
  };

  // Validate
  function validate(name: string): boolean {
    if (touchedFields[name] && errors[name]) {
      return false;
    } else {
      return true;
    }
  }

  // Register Vehicle
  async function registerVehicle(inputs: RegisterInterface): Promise<void> {
    const url: string = "/api/register-vehicle";
    setLoader(true);

    const response: Response = await fetch(url, {
      mode: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputs)
    });

    let res: ResponseInterface = await response.json();

    if (res.success) {
      toast.success(res.message);
      reset();
    } else {
      toast.error(res.message);
    }

    setLoader(false);
  }

  // Option Mapper
  function optionMapper(x: User | Make | Colour): ReactNode {
    return (
      <option key={x.id} value={x.id}>
        {x.name}
      </option>
    );
  }

  return (
    <>
      {loader && <Loader />}
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        className="w-11/12 rounded-xl border border-gray-500 p-4 md:w-5/6 md:p-8 lg:w-1/2"
      >
        <h1 className="font-primary mt-4 mb-8 text-center text-3xl font-medium"> Register Vehicle </h1>

        <div className="relative my-4 w-full bg-inherit">
          <select
            id="ownerID"
            className={`peer h-10 w-full cursor-pointer appearance-none rounded-lg bg-transparent px-4 text-sm ring-1 focus:outline-none ${validate("ownerID") ? "ring-gray-500 focus:border-black focus:ring-black" : "ring-red-500 focus:border-red-500 focus:ring-red-500"}`}
            {...register("ownerID", {
              required: "* Vehicle owner is required.",
              validate: (value: string) => value !== "0" || "* Vehicle owner is required."
            })}
          >
            <option value="0" disabled hidden>
              Select an Owner
            </option>
            {users.map(optionMapper)}
          </select>

          <FontAwesomeIcon
            icon={faCaretDown}
            className={`pointer-events-none absolute top-3 right-3 transition-all ${validate("ownerID") ? "text-gray-500 peer-focus:text-black" : "text-red-500 peer-focus:text-red-500"}`}
          />

          <label
            htmlFor="ownerID"
            className={`absolute -top-3 left-0 mx-1 cursor-text bg-white px-2 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm ${validate("ownerID") ? "text-gray-700 peer-placeholder-shown:text-gray-700 peer-focus:text-black" : "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"}`}
          >
            Vehicle's Owner
          </label>

          <p className={`my-1 w-full px-2 text-xs text-red-500 ${validate("ownerID") ? "invisible" : "visible"}`}>
            {(errors.ownerID && errors.ownerID.message) || <br />}
          </p>
        </div>

        <div className="relative my-4 w-full bg-inherit">
          <select
            id="makeID"
            className={`peer h-10 w-full cursor-pointer appearance-none rounded-lg bg-transparent px-4 text-sm ring-1 focus:outline-none ${validate("makeID") ? "ring-gray-500 focus:border-black focus:ring-black" : "ring-red-500 focus:border-red-500 focus:ring-red-500"}`}
            {...register("makeID", {
              required: "* Vehicle make is required.",
              validate: (value: string) => value !== "0" || "* Vehicle make is required."
            })}
          >
            <option value="0" disabled hidden>
              Select a Make
            </option>
            {makes.map(optionMapper)}
          </select>

          <FontAwesomeIcon
            icon={faCaretDown}
            className={`pointer-events-none absolute top-3 right-3 transition-all ${validate("makeID") ? "text-gray-500 peer-focus:text-black" : "text-red-500 peer-focus:text-red-500"}`}
          />

          <label
            htmlFor="makeID"
            className={`absolute -top-3 left-0 mx-1 cursor-text bg-white px-2 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm ${validate("makeID") ? "text-gray-700 peer-placeholder-shown:text-gray-700 peer-focus:text-black" : "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"}`}
          >
            Vehicle's Make
          </label>

          <p className={`my-1 w-full px-2 text-xs text-red-500 ${validate("makeID") ? "invisible" : "visible"}`}>
            {(errors.makeID && errors.makeID.message) || <br />}
          </p>
        </div>

        <div className="relative my-4 w-full bg-inherit">
          <select
            id="colourID"
            className={`peer h-10 w-full cursor-pointer appearance-none rounded-lg bg-transparent px-4 text-sm ring-1 focus:outline-none ${validate("colourID") ? "ring-gray-500 focus:border-black focus:ring-black" : "ring-red-500 focus:border-red-500 focus:ring-red-500"}`}
            {...register("colourID", {
              required: "* Vehicle colour is required.",
              validate: (value: string) => value !== "0" || "* Vehicle colour is required."
            })}
          >
            <option value="0" disabled hidden>
              Select a Colour
            </option>
            {colours.map(optionMapper)}
          </select>

          <FontAwesomeIcon
            icon={faCaretDown}
            className={`pointer-events-none absolute top-3 right-3 transition-all ${validate("colourID") ? "text-gray-500 peer-focus:text-black" : "text-red-500 peer-focus:text-red-500"}`}
          />

          <label
            htmlFor="colourID"
            className={`absolute -top-3 left-0 mx-1 cursor-text bg-white px-2 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm ${validate("colourID") ? "text-gray-700 peer-placeholder-shown:text-gray-700 peer-focus:text-black" : "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"}`}
          >
            Vehicle's Colour
          </label>

          <p className={`my-1 w-full px-2 text-xs text-red-500 ${validate("colourID") ? "invisible" : "visible"}`}>
            {(errors.colourID && errors.colourID.message) || <br />}
          </p>
        </div>

        <div className="relative my-4 w-full bg-inherit">
          <input
            type="text"
            id="numberPlate"
            placeholder=""
            className={`peer h-10 w-full rounded-lg bg-transparent px-4 text-sm ring-1 focus:outline-none ${validate("numberPlate") ? "ring-gray-500 focus:border-black focus:ring-black" : "ring-red-500 focus:border-red-500 focus:ring-red-500"}`}
            {...register("numberPlate", {
              required: "* Number plate is required.",
              maxLength: {
                value: 10,
                message: "* Number plate must be less than 10 characters."
              },
              pattern: {
                value: /^[A-Z]{2,4}[0-9]{2,4}$/,
                message: "* Please enter a valid number plate."
              }
            })}
          />
          <label
            htmlFor="numberPlate"
            className={`absolute -top-3 left-0 mx-1 cursor-text bg-white px-2 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm ${validate("numberPlate") ? "text-gray-700 peer-placeholder-shown:text-gray-700 peer-focus:text-black" : "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"}`}
          >
            Number Plate
          </label>
          <p className={`my-1 w-full px-2 text-xs text-red-500 ${validate("numberPlate") ? "invisible" : "visible"}`}>
            {(errors.numberPlate && errors.numberPlate.message) || <br />}
          </p>
        </div>

        <div className="my-2">
          <button
            type="submit"
            className="font-primary my-4 w-full cursor-pointer rounded-lg border border-black bg-black p-3 text-sm text-white transition-all hover:bg-white hover:text-black active:scale-95"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
