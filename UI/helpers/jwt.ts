import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
//
import type { TokenInterface } from "@models/types";

const ACCESS_SECRET: string = process.env.ACCESS_SECRET!;
const REFRESH_SECRET: string = process.env.REFRESH_SECRET!;

// Generate Access Token
export function generateAccessToken(userID: string, name: string): string {
  return jwt.sign({ userID: userID, name: name }, ACCESS_SECRET, { expiresIn: "15m" });
}

// Generate Refresh Token
export function generateRefreshToken(userID: string, name: string): string {
  return jwt.sign({ userID: userID, name: name }, REFRESH_SECRET, { expiresIn: "7d" });
}

// Set Cookies
export async function setCookies(userID: string, name: string): Promise<void> {
  const accessToken: string = generateAccessToken(userID, name);
  const refreshToken: string = generateRefreshToken(userID, name);

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
}

// Verify Token
export function verifyToken(token: string, type: "ACCESS" | "REFRESH"): TokenInterface | string {
  let secret: string = type === "ACCESS" ? ACCESS_SECRET : REFRESH_SECRET;

  return jwt.verify(token, secret) as TokenInterface | string;
}
