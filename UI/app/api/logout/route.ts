import { NextResponse } from "next/server";
//
import { logout } from "@helpers/server";
import type { ResponseInterface } from "@models/types";

// Logout API
export async function GET(): Promise<NextResponse<ResponseInterface>> {
  const res: ResponseInterface = await logout();

  return NextResponse.json(res);
}
