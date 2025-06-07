import type { ReactNode } from "react";
//
import Navbar from "@components/Navbar";
import { AuthProvider } from "@components/AuthContext";

// Props
interface Props
{
  children: ReactNode;
}

// Dashboard Layout
export default function Layout({ children }: Props): ReactNode
{
  return (
    <>
      <AuthProvider>
        <div className=" h-screen flex">
          <Navbar />
          <main className=" w-5/6 p-6">
            { children }
          </main>
        </div>
      </AuthProvider>
    </>
  );
}