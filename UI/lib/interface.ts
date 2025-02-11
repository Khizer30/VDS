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

export type { Props, ResponseInterface };