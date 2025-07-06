import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient, type User } from "@app/generated/prisma";
//
import { comparePasswords } from "@helpers/encrypt";
import { setCookies } from "@helpers/jwt";
import type { ResponseInterface, LoginInterface, UserInterface } from "@models/types";

// Login API
export async function POST(req: NextRequest): Promise<NextResponse<ResponseInterface>> {
  const response: ResponseInterface = { success: false, message: "" };
  const prisma: PrismaClient = new PrismaClient();
  const data: LoginInterface = await req.json();

  try {
    const user: User | null = await prisma.user.findUnique({ where: { email: data.email } });

    if (user) {
      const isValid: boolean = await comparePasswords(data.password, user.password);

      if (isValid) {
        await setCookies(user.id.toString(), user.name);

        const userObj: UserInterface = {
          userID: user.id.toString(),
          name: user.name
        };

        response.success = true;
        response.message = JSON.stringify(userObj);
      } else {
        response.success = false;
        response.message = "The password you entered is incorrect";
      }
    } else {
      response.success = false;
      response.message = "The email address is not registered";
    }
  } catch {
    response.success = false;
    response.message = "An error occurred during database operation";
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(response);
}
