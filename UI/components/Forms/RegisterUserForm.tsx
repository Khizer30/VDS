"use client";
import toast from "react-hot-toast";
import { useState, type ReactNode } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
//
import Loader from "@components/Loader";
import type { ResponseInterface, SignupInterface } from "@models/types";

// Register User Form
export default function RegisterUserForm(): ReactNode {
  // States
  const [loader, setLoader] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, touchedFields }
  } = useForm<SignupInterface>({
    mode: "onTouched",
    defaultValues: { name: "", email: "", password: "", repassword: "" }
  });

  // On Submit
  const onSubmit: SubmitHandler<SignupInterface> = (data: SignupInterface) => {
    signupUser(data);
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

  // Signup User
  async function signupUser(inputs: SignupInterface): Promise<void> {
    const url: string = "/api/signup";
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

  return (
    <>
      {loader && <Loader />}
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        className="w-11/12 rounded-xl border border-gray-500 p-4 md:w-5/6 md:p-8 lg:w-1/2"
      >
        <h1 className="font-primary mt-4 mb-8 text-center text-3xl font-medium"> Register User </h1>

        <div className="relative my-4 w-full bg-inherit">
          <input
            type="text"
            id="name"
            placeholder=""
            className={`peer h-10 w-full rounded-lg bg-transparent px-4 text-sm ring-1 focus:outline-none ${validate("name") ? "ring-gray-500 focus:border-black focus:ring-black" : "ring-red-500 focus:border-red-500 focus:ring-red-500"}`}
            {...register("name", {
              required: "* Name is required.",
              maxLength: {
                value: 100,
                message: "* Name must be less than 100 characters."
              },
              pattern: {
                value: /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/,
                message: "* Please enter a valid name."
              }
            })}
          />
          <label
            htmlFor="name"
            className={`absolute -top-3 left-0 mx-1 cursor-text bg-white px-2 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm ${validate("name") ? "text-gray-700 peer-placeholder-shown:text-gray-700 peer-focus:text-black" : "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"}`}
          >
            Name
          </label>
          <p className={`my-1 w-full px-2 text-xs text-red-500 ${validate("name") ? "invisible" : "visible"}`}>
            {(errors.name && errors.name.message) || <br />}
          </p>
        </div>

        <div className="relative my-4 w-full bg-inherit">
          <input
            type="email"
            id="email"
            placeholder=""
            className={`peer h-10 w-full rounded-lg bg-transparent px-4 text-sm ring-1 focus:outline-none ${validate("email") ? "ring-gray-500 focus:border-black focus:ring-black" : "ring-red-500 focus:border-red-500 focus:ring-red-500"}`}
            {...register("email", {
              required: "* Email is required.",
              maxLength: {
                value: 100,
                message: "* Email must be less than 100 characters."
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "* Please enter a valid email address."
              }
            })}
          />
          <label
            htmlFor="email"
            className={`absolute -top-3 left-0 mx-1 cursor-text bg-white px-2 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm ${validate("email") ? "text-gray-700 peer-placeholder-shown:text-gray-700 peer-focus:text-black" : "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"}`}
          >
            Email
          </label>
          <p className={`my-1 w-full px-2 text-xs text-red-500 ${validate("email") ? "invisible" : "visible"}`}>
            {(errors.email && errors.email.message) || <br />}
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
