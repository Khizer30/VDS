import { PrismaClient, type Session } from "@app/generated/prisma";

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
export async function extendUserSession(
  userID: string,
  refreshTokenPrev: string,
  refreshTokenNew: string,
  createdAt: Date,
  expiresAt: Date
): Promise<void> {
  const prisma: PrismaClient = new PrismaClient();

  try {
    const newSession: Session | null = await prisma.session.create({
      data: {
        userID: +userID,
        refreshToken: refreshTokenNew,
        createdAt: createdAt,
        expiresAt: expiresAt,
        revoked: false
      }
    });

    if (newSession) {
      await prisma.session.update({
        where: {
          refreshToken: refreshTokenPrev
        },
        data: {
          revoked: true,
          replacedByID: newSession.id
        }
      });
    }
  } catch {
    console.log("User session extension failed");
  } finally {
    await prisma.$disconnect();
  }
}

// Validate Refresh Token
export async function validateRefreshToken(refreshToken: string): Promise<boolean> {
  let flag: boolean = false;
  const prisma: PrismaClient = new PrismaClient();

  try {
    const session: Session | null = await prisma.session.findUnique({
      where: {
        refreshToken: refreshToken
      }
    });

    if (session && !session.revoked) {
      flag = true;
    }
  } catch {
    console.log("Failed to validate refresh token in database");
  } finally {
    await prisma.$disconnect();
  }

  return flag;
}
