import { NextResponse } from "next/server";
//
import { clearCookies } from "@helpers/jwt";
import type { ResponseInterface } from "@models/types";

// Logout API
export async function GET(): Promise<NextResponse<ResponseInterface>> {
  const response: ResponseInterface = { success: false, message: "" };

  await clearCookies();

  response.success = true;
  response.message = "Logout successful";

  return NextResponse.json(response);
}
