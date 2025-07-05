import jwt, { type JwtPayload } from "jsonwebtoken";

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

// Verify Access Token
export function verifyAccessToken(token: string): JwtPayload | string {
  return jwt.verify(token, ACCESS_SECRET);
}
