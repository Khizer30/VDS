"use client";
import Link from "next/link";
import Lottie from "react-lottie-player";
import { ReactNode } from "react";
//
import animationData from "@images/lottie/login.json";

// Login From
export default function LoginForm(): ReactNode
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
          <h1 className=" my-2 font-secondary font-bold text-3xl"> Log in to </h1>
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
      </div>
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