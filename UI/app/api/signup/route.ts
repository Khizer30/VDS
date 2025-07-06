import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@app/generated/prisma";
//
import { hashPassword } from "@helpers/encrypt";
import type { ResponseInterface, SignupInterface } from "@models/types";

// Signup API
export async function POST(req: NextRequest): Promise<NextResponse<ResponseInterface>> {
  const response: ResponseInterface = { success: false, message: "" };
  const prisma: PrismaClient = new PrismaClient();
  const data: SignupInterface = await req.json();

  try {
    await prisma.user.create({
      data: { name: data.name, email: data.email, password: await hashPassword(data.password) }
    });

    response.success = true;
    response.message = "User registration successful.";
  } catch {
    response.success = false;
    response.message = "An error occurred during database operation";
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(response);
}
