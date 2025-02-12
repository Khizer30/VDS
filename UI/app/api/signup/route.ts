import { NextResponse, type NextRequest } from "next/server";
import prisma from "@lib/prisma";
import type { User } from "@prisma/client";
//
import { responseObj } from "@lib/objects";
import type { ResponseInterface } from "@lib/interface";

// Signup POST API
export async function POST(req: NextRequest): Promise<NextResponse>
{
  const response: ResponseInterface = responseObj;

  try
  {
    const { email, name, password }: User = await req.json();

    const user: User | null = await prisma.user.findFirst({ where: { email: email } });

    if (user)
    {
      response.success = false;
      response.message = "Email Already Exists!";
    }
    else
    {
      await prisma.user.create({
        data:
        {
          email: email,
          name: name,
          password: password
        }
      });

      response.success = true;
      response.message = "User Created Successfully!";
    }
  }
  catch (error: unknown)
  {
    response.success = false;
    response.message = "Error Signing Up! Try Later...";
  }
  finally
  {
    await prisma.$disconnect();
  }

  return NextResponse.json(response);
}