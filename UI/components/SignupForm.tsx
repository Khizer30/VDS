"use client";
import { useState, type ReactNode, type ChangeEvent, type FormEvent } from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
//
import Loading from "@components/Loading";
import animationData from "@images/lottie/signup.json";
import validate from "@lib/validate";
import { useAuth } from "@components/AuthContext";
import { auth } from "@lib/supabase";
import { userObj, signupInputsObj } from "@lib/objects";
import type { ResponseInterface, SignupInputsInterface } from "@lib/interface";

// Import Lottie
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

// Signup
export default function SignupForm(): ReactNode
{
  const { user, loading } = useAuth();
  const [inputs, setInputs] = useState<SignupInputsInterface>(signupInputsObj);
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
  if (user)
  {
    redirect("/dashboard");
  }

  // Handle Change
  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void
  {
    setInputs((x: SignupInputsInterface) => ({ ...x, [e.target.name]: e.target.value }));
  }

  // Handle Submit
  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void>
  {
    e.preventDefault();

    if (validateInputs())
    {
      const response: Response = await fetch("/api/signup",
        {
          mode: "same-origin",
          cache: "no-cache",
          method: "POST",
          headers:
          {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...userObj, name: inputs.name, email: inputs.email, password: inputs.password })
        });

      const res: ResponseInterface = await response.json();

      if (res.success)
      {
        await auth.signUp({ email: inputs.email, password: inputs.password });

        setAlert(false);
        setMessage(res.message);

        setInputs(signupInputsObj);

        setTimeout(() => { redirect("/login"); }, 1500);
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
    const list: string[] = ["email", "name", "password"];

    setAlert(true);
    setMessage("");

    if (inputs.password !== inputs.repassword)
    {
      valid = false;

      setAlert(true);
      setMessage("Passwords Do Not Match!");
    }
    else
    {
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
          <h1 className=" my-2 font-secondary font-bold text-3xl"> Sign up to </h1>
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
            <label htmlFor="name" className=" my-1 font-secondary text-sm"> Name </label>
            <input
              name="name"
              type="text"
              required
              maxLength={ 100 }
              placeholder="Enter Your Name"
              className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
              value={ inputs.name }
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

          <div className=" my-2 flex flex-col">
            <label htmlFor="repassword" className=" my-1 font-secondary text-sm"> Confirm Password </label>
            <input
              name="repassword"
              type="password"
              required
              maxLength={ 100 }
              placeholder="Confirm Your Password"
              className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
              value={ inputs.repassword }
              onChange={ handleChange }
            />
          </div>

          <div className=" my-2">
            <button
              type="submit"
              className=" w-full my-4 p-3 font-secondary text-sm btn"
            >
              Register
            </button>
          </div>

          <div className=" mt-4 mb-2 flex justify-center items-center">
            <p className=" font-secondary text-xs"> Already have an Account ? <Link href="/login" className="font-bold"> Login </Link> </p>
          </div>

        </form>
      </div>
      <div className=" col-span-1 hidden md:flex justify-center items-center">
        <Lottie
          loop
          play
          animationData={ animationData }
          className=" w-[30rem] hover:scale-95 transition-all duration-300"
        />
      </div>
    </>
  );
}