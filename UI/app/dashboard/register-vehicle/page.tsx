import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import RegisterForm from "@components/Forms/RegisterForm";

export const metadata: Metadata = {
  title: "Register Vehicle | Vehicle Detection System"
};

// Register Vehicle Page
export default function Page(): ReactNode {
  return (
    <>
      <RegisterForm />
    </>
  );
}
