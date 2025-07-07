import { NextResponse } from "next/server";
import { cookies } from "next/headers";
//
import { renewCookies, verifyToken } from "@helpers/jwt";
import type { ResponseInterface, TokenInterface, UserInterface } from "@models/types";

// Me API
export async function GET(): Promise<NextResponse<ResponseInterface>> {
  const response: ResponseInterface = { success: false, message: "" };
  const accessToken: string | undefined = (await cookies()).get("accessToken")?.value;
  const refreshToken: string | undefined = (await cookies()).get("refreshToken")?.value;

  if (accessToken) {
    const accessTokenPayload: TokenInterface | string = verifyToken(accessToken, "ACCESS");

    if (accessTokenPayload instanceof Object) {
      const user: UserInterface = {
        userID: accessTokenPayload.userID,
        name: accessTokenPayload.name
      };

      response.success = true;
      response.message = JSON.stringify(user);
    }
  } else if (refreshToken) {
    // Check If Not Revoked In Database

    const refreshTokenPayload: TokenInterface | string = verifyToken(refreshToken, "REFRESH");

    if (refreshTokenPayload instanceof Object) {
      await renewCookies(refreshTokenPayload.userID, refreshTokenPayload.name, refreshToken);

      const user: UserInterface = {
        userID: refreshTokenPayload.userID,
        name: refreshTokenPayload.name
      };

      response.success = true;
      response.message = JSON.stringify(user);
    }
  }

  return NextResponse.json(response);
}
