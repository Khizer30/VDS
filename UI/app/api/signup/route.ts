import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient, type User } from "@app/generated/prisma";
//
import { hashPassword } from "@helpers/encrypt";
import type { ResponseInterface, SignupInterface } from "@models/types";

// Signup API
export async function POST(req: NextRequest): Promise<NextResponse<ResponseInterface>> {
  const response: ResponseInterface = { success: false, message: "" };
  const prisma: PrismaClient = new PrismaClient();
  const data: SignupInterface = await req.json();

  try {
    const user: User | null = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      await prisma.user.create({
        data: { name: data.name, email: data.email, password: await hashPassword(data.password), isAdmin: false }
      });

      response.success = true;
      response.message = "User registration successful.";
    } else {
      response.success = false;
      response.message = "User is already registered.";
    }
  } catch {
    response.success = false;
    response.message = "An error occurred during database operation";
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(response);
}
