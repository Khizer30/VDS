import { NextResponse, type NextRequest } from "next/server";
import prisma from "@lib/prisma";
import type { Vehicle } from "@prisma/client";
//
import { responseObj } from "@lib/objects";
import type { ResponseInterface } from "@lib/interface";

// Register POST API
export async function POST(req: NextRequest): Promise<NextResponse>
{
  const response: ResponseInterface = responseObj;

  try
  {
    const { makeID, colourID, userID, numberPlate }: Vehicle = await req.json();

    await prisma.vehicle.create({
      data:
      {
        makeID: +makeID,
        colourID: +colourID,
        userID: 1,
        numberPlate: numberPlate,
      }
    });

    response.success = true;
    response.message = "Vehicle Added Successfully!";
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