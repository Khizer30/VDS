import jwt from "jsonwebtoken";
//
import type { TokenInterface } from "@models/types";

const ACCESS_SECRET: string = process.env.ACCESS_SECRET!;
const REFRESH_SECRET: string = process.env.REFRESH_SECRET!;

// Generate Access Token
export function generateAccessToken(userID: string, name: string): string {
  return jwt.sign({ userID: userID, name: name }, ACCESS_SECRET, { expiresIn: "15m" });
}

// Generate Refresh Tokeb
export function generateRefreshToken(userID: string, name: string): string {
  return jwt.sign({ userID: userID, name: name }, REFRESH_SECRET, { expiresIn: "7d" });
}

// Verify Token
export function verifyToken(token: string, type: "ACCESS" | "REFRESH"): TokenInterface | string {
  let secret: string = type === "ACCESS" ? ACCESS_SECRET : REFRESH_SECRET;

  return jwt.verify(token, secret) as TokenInterface | string;
}
