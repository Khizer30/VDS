"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
//
import Loader from "@components/Loader";
import animationData from "@images/lottie/signup.json";
import type { ResponseInterface, SignupInterface } from "@models/types";

// Import Lottie
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

// Signup
export default function SignupForm(): ReactNode {
  // Constructors
  const router: AppRouterInstance = useRouter();

  // States
  const [loader, setLoader] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields }
  } = useForm<SignupInterface>({
    mode: "onTouched",
    defaultValues: { name: "", email: "", password: "", repassword: "" }
  });

  // On Submit
  const onSubmit: SubmitHandler<SignupInterface> = (data: SignupInterface) => {
    if (validateForm(data)) {
      if (data.password === data.repassword) {
        signup(data);
      } else {
        toast.error("Passwords do not match");
      }
    }
  };

  // Validate Form
  function validateForm(data: SignupInterface): boolean {
    let flag: boolean = true;

    Object.keys(data).forEach((key: string): void => {
      if (!validate(key)) {
        flag = false;
      }
    });

    return flag;
  }

  // Validate
  function validate(name: string): boolean {
    if (touchedFields[name] && errors[name]) {
      return false;
    } else {
      return true;
    }
  }

  // Signup
  async function signup(inputs: SignupInterface): Promise<void> {
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
    setLoader(false);

    if (res.success) {
      toast.success(res.message);
      setTimeout(() => router.push("/login"), 1000);
    } else {
      toast.error(res.message);
      reset();
    }
  }

  return (
    <>
      {loader && <Loader />}
      <Toaster />
      <div className="col-span-1 mb-8 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="w-11/12 rounded-xl border border-gray-500 p-4 md:w-5/6 md:p-8"
        >
          <h3 className="font-primary my-2 text-lg font-light"> Welcome! </h3>
          <h1 className="font-primary my-2 text-3xl font-bold"> Sign up to </h1>
          <h2 className="font-primary my-2"> Vehicle Detection System </h2>

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

          <div className="relative my-4 w-full bg-inherit">
            <input
              type="password"
              id="password"
              placeholder=""
              className={`peer h-10 w-full rounded-lg bg-transparent px-4 text-sm ring-1 focus:outline-none ${validate("password") ? "ring-gray-500 focus:border-black focus:ring-black" : "ring-red-500 focus:border-red-500 focus:ring-red-500"}`}
              {...register("password", {
                required: "* Password is required.",
                maxLength: {
                  value: 100,
                  message: "* Password must be less than 100 characters."
                },
                minLength: {
                  value: 8,
                  message: "* Password must be at least 8 characters long"
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "* Please enter a valid password."
                }
              })}
            />
            <label
              htmlFor="password"
              className={`absolute -top-3 left-0 mx-1 cursor-text bg-white px-2 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm ${validate("password") ? "text-gray-700 peer-placeholder-shown:text-gray-700 peer-focus:text-black" : "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"}`}
            >
              Password
            </label>
            <p className={`my-1 w-full px-2 text-xs text-red-500 ${validate("password") ? "invisible" : "visible"}`}>
              {(errors.password && errors.password.message) || <br />}
            </p>
          </div>

          <div className="relative my-4 w-full bg-inherit">
            <input
              type="password"
              id="repassword"
              placeholder=""
              className={`peer h-10 w-full rounded-lg bg-transparent px-4 text-sm ring-1 focus:outline-none ${validate("repassword") ? "ring-gray-500 focus:border-black focus:ring-black" : "ring-red-500 focus:border-red-500 focus:ring-red-500"}`}
              {...register("repassword", {
                required: "* Password is required.",
                maxLength: {
                  value: 100,
                  message: "* Password must be less than 100 characters."
                },
                minLength: {
                  value: 8,
                  message: "* Password must be at least 8 characters long"
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "* Please enter a valid password."
                }
              })}
            />
            <label
              htmlFor="repassword"
              className={`absolute -top-3 left-0 mx-1 cursor-text bg-white px-2 text-xs transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm ${validate("repassword") ? "text-gray-700 peer-placeholder-shown:text-gray-700 peer-focus:text-black" : "text-red-500 peer-placeholder-shown:text-red-500 peer-focus:text-red-500"}`}
            >
              Confirm Password
            </label>
            <p className={`my-1 w-full px-2 text-xs text-red-500 ${validate("repassword") ? "invisible" : "visible"}`}>
              {(errors.repassword && errors.repassword.message) || <br />}
            </p>
          </div>

          <div className="my-2">
            <button
              type="submit"
              className="font-primary my-4 w-full cursor-pointer rounded-lg border border-black bg-black p-3 text-sm text-white transition-all hover:bg-white hover:text-black active:scale-95"
            >
              Signup
            </button>
          </div>

          <div className="mt-4 mb-2 flex items-center justify-center">
            <p className="font-primary text-xs">
              Already have an account? &nbsp;
              <Link href="/login" className="font-bold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="col-span-1 hidden items-center justify-center md:flex">
        <Lottie
          loop
          play
          animationData={animationData}
          className="w-[35rem] transition-all duration-300 hover:scale-95"
        />
      </div>
    </>
  );
}
