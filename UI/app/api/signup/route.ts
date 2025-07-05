import { NextResponse, type NextRequest } from "next/server";
//
import { signup } from "@helpers/server";
import type { ResponseInterface, SignupInterface } from "@models/types";

// Signup API
export async function POST(req: NextRequest): Promise<NextResponse<ResponseInterface>> {
  const data: SignupInterface = await req.json();
  const res: ResponseInterface = await signup(data);

  return NextResponse.json(res);
}
