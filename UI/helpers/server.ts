import { PrismaClient } from "@app/generated/prisma";
import { ResponseInterface, SignupInterface } from "@models/types";

// Signup
export async function signup(data: SignupInterface): Promise<ResponseInterface> {
  const prisma: PrismaClient = new PrismaClient();
  const response: ResponseInterface = { success: false, message: "" };

  try {
    await prisma.user.create({
      data: { name: data.name, email: data.email, password: data.password }
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
