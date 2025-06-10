import { NextResponse, type NextRequest } from "next/server";
import prisma from "@lib/prisma";
import type { User } from "@prisma/client";
//
import { responseObj } from "@lib/objects";
import type { ResponseInterface } from "@lib/interface";

// JSON
interface JSON
{
  email: string;
  makeID: string;
  colourID: string;
  numberPlate: string;
}

// Register POST API
export async function POST(req: NextRequest): Promise<NextResponse>
{
  const response: ResponseInterface = responseObj;

  try
  {
    const { email, makeID, colourID, numberPlate }: JSON = await req.json();

    const user: User | null = await prisma.user.findFirst({ where: { email: email } });

    if (user)
    {
      await prisma.vehicle.create({
        data:
        {
          makeID: +makeID,
          colourID: +colourID,
          numberPlate: numberPlate,
          userID: user.id
        }
      });

      response.success = true;
      response.message = "Vehicle Added Successfully!";
    }
    else
    {
      response.success = false;
      response.message = "This User Can't Create Vehicle!";
    }
  }
  catch (error: unknown)
  {
    console.log(error);
    response.success = false;
    response.message = "Error Adding Vehicle! Try Later...";
  }
  finally
  {
    await prisma.$disconnect();
  }

  return NextResponse.json(response);
}