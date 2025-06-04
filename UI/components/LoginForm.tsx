"use client";
import { useState, type ReactNode, type ChangeEvent, type FormEvent } from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { User } from "@prisma/client";
//
import Loading from "@components/Loading";
import animationData from "@images/lottie/login.json";
import validate from "@lib/validate";
import { useAuth } from "@components/AuthContext";
import { auth } from "@lib/supabase";
import { userObj } from "@lib/objects";
import type { ResponseInterface } from "@lib/interface";

// Import Lottie
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

// Login From
export default function LoginForm(): ReactNode
{
  const [inputs, setInputs] = useState<User>(userObj);
  const [alert, setAlert] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const { user, loading } = useAuth();

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
  if (user)
  {
    redirect("/dashboard");
  }

  // Handle Change
  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void
  {
    setInputs((x: User) => ({ ...x, [e.target.name]: e.target.value }));
  }

  // Handle Submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void>
  {
    e.preventDefault();

    if (validateInputs())
    {
      login();
    }
  }

  // Login
  async function login(): Promise<void>
  {
    const { data, error } = await auth.signInWithPassword({ email: inputs.email, password: inputs.password });

    if (data.user && data.session)
    {
      redirect("/dashboard");
    }
    else if (error)
    {
      let message: string = error.message;

      if (message === "Invalid login credentials")
      {
        message = "Invalid Email or Password. Please Try Again.";
      }

      setAlert(true);
      setMessage(message);
    }
  }

  // Validate Inputs
  function validateInputs(): boolean
  {
    let valid: boolean = true;
    const list: string[] = ["email", "password"];

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
      <div className=" col-span-1 flex justify-center items-center">
        <form
          method="post"
          autoComplete="off"
          noValidate
          className=" w-11/12 md:w-5/6 p-4 md:p-8 border rounded-xl border-quaternary"
          onSubmit={ handleSubmit }
        >

          <h3 className=" my-2 font-secondary font-light text-lg"> Welcome! </h3>
          <h1 className=" my-2 font-secondary font-bold text-3xl"> Log in to </h1>
          <h2 className=" my-2 font-secondary"> Vehicle Detection System </h2>

          <p className={ (message ? "" : " invisible") + (alert ? " bg-red" : " bg-green") + " py-3 font-secondary text-sm text-center text-white rounded transition-all duration-300 hover:scale-95" }> { message || <br /> } </p>

          <div className=" my-2 flex flex-col">
            <label htmlFor="email" className=" my-1 font-secondary text-sm"> Email </label>
            <input
              name="email"
              type="email"
              autoFocus
              required
              maxLength={ 100 }
              placeholder="Enter Your Email"
              className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
              value={ inputs.email }
              onChange={ handleChange }
            />
          </div>

          <div className=" my-2 flex flex-col">
            <label htmlFor="password" className=" my-1 font-secondary text-sm"> Password </label>
            <input
              name="password"
              type="password"
              required
              maxLength={ 100 }
              placeholder="Enter Your Password"
              className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
              value={ inputs.password }
              onChange={ handleChange }
            />
          </div>

          <div className=" my-2">
            <button
              type="submit"
              className=" w-full my-4 p-3 font-secondary text-sm btn"
            >
              Login
            </button>
          </div>

          <div className=" mt-4 mb-2 flex justify-center items-center">
            <p className=" font-secondary text-xs"> Don’t have an Account ? <Link href="/signup" className="font-bold"> Register </Link> </p>
          </div>

        </form>
      </div >
      <div className=" col-span-1 hidden md:flex justify-center items-center">
        <Lottie
          loop
          play
          animationData={ animationData }
          className=" w-[35rem] hover:scale-95 transition-all duration-300"
        />
      </div>
    </>
  );
}