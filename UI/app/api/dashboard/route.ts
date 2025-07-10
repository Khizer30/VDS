import { NextResponse } from "next/server";
import { PrismaClient } from "@app/generated/prisma";
//
import type { ResponseInterface } from "@models/types";

// Dashboard API
export async function GET(): Promise<NextResponse<ResponseInterface>> {
  const response: ResponseInterface = { success: false, message: "" };
  const prisma: PrismaClient = new PrismaClient();

  try {
    response.success = true;
    response.message = "";
  } catch {
    response.success = false;
    response.message = "An error occurred during database operation";
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(response);
}
