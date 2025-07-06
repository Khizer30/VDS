import { PrismaClient, type User } from "@app/generated/prisma";
//
import { hashPassword, comparePasswords } from "@helpers/encrypt";
import { setCookies, clearCookies } from "@helpers/jwt";
import { ResponseInterface, SignupInterface, LoginInterface, UserInterface } from "@models/types";

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

  return response;
}

// Logout
export async function logout(): Promise<ResponseInterface> {
  const response: ResponseInterface = { success: false, message: "" };

  await clearCookies();

  response.success = true;
  response.message = "Logout successful";

  return response;
}
