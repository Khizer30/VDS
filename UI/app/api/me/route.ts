import { NextResponse } from "next/server";
import { cookies } from "next/headers";
//
import { verifyToken } from "@helpers/jwt";
import type { ResponseInterface, TokenInterface, UserInterface } from "@models/types";

// Me API
export async function GET(): Promise<NextResponse<ResponseInterface>> {
  const res: ResponseInterface = { success: false, message: "" };
  const token: string | undefined = (await cookies()).get("accessToken")?.value;

  if (token) {
    const accessTokenPayload: TokenInterface | string = verifyToken(token, "ACCESS");

    if (accessTokenPayload instanceof Object) {
      const user: UserInterface = {
        userID: accessTokenPayload.userID,
        name: accessTokenPayload.name
      };

      res.success = true;
      res.message = JSON.stringify(user);
    } else {
      res.success = false;
      res.message = "Invalid Token";
    }
  } else {
    res.success = false;
    res.message = "Unauthenticated";
  }

  return NextResponse.json(res);
}
