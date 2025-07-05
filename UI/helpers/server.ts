import { PrismaClient, type User } from "@app/generated/prisma";
import { cookies } from "next/headers";
//
import { hashPassword, comparePasswords } from "@helpers/encrypt";
import { generateAccessToken, generateRefreshToken } from "@helpers/jwt";
import { ResponseInterface, SignupInterface, LoginInterface } from "@models/types";

// Signup
export async function signup(data: SignupInterface): Promise<ResponseInterface> {
  const prisma: PrismaClient = new PrismaClient();
  const response: ResponseInterface = { success: false, message: "" };

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

  return response;
}

// Login
export async function login(data: LoginInterface): Promise<ResponseInterface> {
  const prisma: PrismaClient = new PrismaClient();
  const response: ResponseInterface = { success: false, message: "" };

  try {
    const user: User | null = await prisma.user.findUnique({ where: { email: data.email } });

    if (user) {
      const isValid: boolean = await comparePasswords(data.password, user.password);

      if (isValid) {
        const accessToken: string = generateAccessToken(user.id.toString(), user.name);
        const refreshToken: string = generateRefreshToken(user.id.toString(), user.name);

        const secure: boolean = process.env.NODE_ENV === "production" ? true : false;

        (await cookies()).set("accessToken", accessToken, {
          httpOnly: true,
          secure: secure,
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 15
        });

        (await cookies()).set("refreshToken", refreshToken, {
          httpOnly: true,
          secure: secure,
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7
        });

        response.success = true;
        response.message = `Welcome ${user.name}`;
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

  return response;
}
