import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@fontsource/roboto";
import "@fontsource/poppins";
//
import "./globals.css";

// Props
interface Props
{
  children: ReactNode;
}

export const metadata: Metadata =
{
  title: "Vehicle Detection System",
  description: "A simple Vehicle Detection System.",
  authors: [{ name: "Syed Muhammad Khizer", url: "https://syedmuhammadkhizer.vercel.app" }],
  icons: "./favicon.png",
};

// Layout
export default function Layout({ children }: Props): ReactNode
{
  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  );
}
