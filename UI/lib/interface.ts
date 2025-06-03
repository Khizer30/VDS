import type { ReactNode } from "react";
import type { Make, Colour, User } from "@prisma/client";

// Props
interface Props
{
  children: ReactNode;
}

// Response Interface
interface ResponseInterface
{
  success: boolean;
  message: string;
}

// Signup Inputs Interface
interface SignupInputsInterface
{
  email: string;
  name: string;
  password: string;
  repassword: string;
}

// Makes & Colours Interface
interface MakesAndColoursInterface
{
  makes: Make[];
  colours: Colour[];
}

// Auth Context Type
interface AuthContextInterface
{
  user: User | null;
  loading: boolean;
}

export type { Props, ResponseInterface, SignupInputsInterface, MakesAndColoursInterface, AuthContextInterface };