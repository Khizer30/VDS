import { PrismaClient } from "@app/generated/prisma";

// Create User Session
export async function createUserSession(
  userID: string,
  refreshToken: string,
  createdAt: Date,
  expiresAt: Date
): Promise<void> {
  const prisma: PrismaClient = new PrismaClient();

  try {
    await prisma.session.create({
      data: {
        userID: +userID,
        refreshToken: refreshToken,
        createdAt: createdAt,
        expiresAt: expiresAt,
        revoked: false
      }
    });
  } catch {
    console.log("User session creation failed");
  } finally {
    await prisma.$disconnect();
  }
}

// Extend User Session
