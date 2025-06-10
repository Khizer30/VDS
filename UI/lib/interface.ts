import type { ReactNode } from "react";
import type { Make, Colour, User } from "@prisma/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

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

// Auth Context Type
interface AuthContextInterface
{
  user: SupabaseUser | null;
  loading: boolean;
}

export type { Props, ResponseInterface, SignupInputsInterface, AuthContextInterface };