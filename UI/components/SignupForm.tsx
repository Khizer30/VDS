"use client";
import Link from "next/link";
import Lottie from "react-lottie-player";
import type { ReactNode } from "react";
//
import animationData from "@images/lottie/signup.json";

// Signup
export default function SignupForm(): ReactNode
{
  return (
    <>
      <div className=" col-span-1 flex justify-center items-center">
        <form
          action="#"
          method="post"
          className=" w-11/12 md:w-5/6 p-4 md:p-8 border rounded-xl border-quaternary"
        >

          <h3 className=" my-2 font-secondary font-light text-lg"> Welcome! </h3>
          <h1 className=" my-2 font-secondary font-bold text-3xl"> Sign up to </h1>
          <h2 className=" mt-2 mb-8 font-secondary"> Vehicle Detection System </h2>

          <div className=" my-2 flex flex-col">
            <label htmlFor="email" className=" my-1 font-secondary text-sm"> Email </label>
            <input
              name="email"
              type="email"
              autoFocus
              required
              maxLength={ 100 }
              placeholder="Enter Your Email"
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
            />
          </div>

          <div className=" my-2 flex flex-col">
            <label htmlFor="username" className=" my-1 font-secondary text-sm"> Username </label>
            <input
              name="username"
              type="text"
              required
              maxLength={ 100 }
              placeholder="Enter Your Username"
              pattern="[a-zA-Z]+$"
              className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
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
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
              className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
            />
          </div>

          <div className=" my-2 flex flex-col">
            <label htmlFor="repassword" className=" my-1 font-secondary text-sm"> Confirm Password </label>
            <input
              name="repassword"
              type="password"
              required
              maxLength={ 100 }
              placeholder="Confirm Your Email"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$"
              className=" my-1 px-4 py-2 font-secondary text-sm text-black boxShadow"
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