import { redirect } from "next/navigation";
import type { ReactNode } from "react";

// Home Page
export default function Page(): ReactNode {
  redirect("/login");
}
