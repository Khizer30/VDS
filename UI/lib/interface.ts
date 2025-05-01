import type { ReactNode } from "react";

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

// Register Vehicle Inputs Interface
interface RegisterVehicleInputsInterface
{
  make: string;
  colour: string;
  numberPlate: string;
}

export type { Props, ResponseInterface, SignupInputsInterface, RegisterVehicleInputsInterface };