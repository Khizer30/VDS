import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@fontsource-variable/roboto";
//
import { AuthProvider } from "@components/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vehicle Detection System",
  description: "A Simple Vehicle Detection System.",
  authors: [{ name: "Syed Muhammad Khizer" }],
  icons: "/favicon.png"
};

// Props
interface Props {
  children: ReactNode;
}

// Layout
export default function Layout({ children }: Props): ReactNode {
  return (
    <html lang="en">
      <body>
        <AuthProvider> {children} </AuthProvider>
      </body>
    </html>
  );
}
