import type { ReactNode } from "react";
import type { Metadata } from "next";
//
import RegisterUserForm from "@components/Forms/RegisterUserForm";

export const metadata: Metadata = {
  title: "Register User | Vehicle Detection System"
};

// Register User Page
export default function Page(): ReactNode {
  return (
    <>
      <RegisterUserForm />
    </>
  );
}
