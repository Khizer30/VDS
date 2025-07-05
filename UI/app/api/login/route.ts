import { NextResponse, type NextRequest } from "next/server";
//
import { login } from "@helpers/server";
import type { ResponseInterface, LoginInterface } from "@models/types";

// Login API
export async function POST(req: NextRequest): Promise<NextResponse<ResponseInterface>> {
  const data: LoginInterface = await req.json();
  const res: ResponseInterface = await login(data);

  return NextResponse.json(res);
}
