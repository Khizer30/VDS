import { type NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";
import type { Vehicle } from "@prisma/client";

export async function POST(req: NextRequest): Promise<NextResponse>
{
  try
  {
    const { make, colour, numberPlate, userID }: Vehicle = await req.json();

    await prisma.vehicle.create({
      data:
      {
        make: make,
        colour: colour,
        numberPlate: numberPlate,
        userID: 1
      }
    });

    return NextResponse.json({ success: true });
  }
  catch (error: unknown)
  {
    return NextResponse.json({ error: error });
  }
  finally
  {
    await prisma.$disconnect();
  }
}