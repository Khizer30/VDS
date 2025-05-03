import { NextResponse, type NextRequest } from "next/server";
import prisma from "@lib/prisma";
import type { User } from "@prisma/client";
//
import { responseObj } from "@lib/objects";
import type { ResponseInterface } from "@lib/interface";

// Login POST API
export async function POST(req: NextRequest): Promise<NextResponse>
{
  const response: ResponseInterface = responseObj;

  try
  {
    const { email, password }: User = await req.json();

    const user: User | null = await prisma.user.findFirst({ where: { email: email, password: password } });

    if (user)
    {
      response.success = true;
      response.message = "Login Successfull!";
    }
    else
    {
      response.success = false;
      response.message = "Invalid Email or Password!";
    }
  }
  catch (error: unknown)
  {
    console.log(error);
    response.success = false;
    response.message = "Error Logging In! Try Later...";
  }
  finally
  {
    await prisma.$disconnect();
  }

  return NextResponse.json(response);
}