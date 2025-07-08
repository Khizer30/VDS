import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient, type Vehicle } from "@app/generated/prisma";
//
import type { ResponseInterface, RegisterInterface, RegisterResponseInterface } from "@models/types";

// Register API
export async function GET(): Promise<NextResponse<RegisterResponseInterface>> {
  const response: RegisterResponseInterface = { success: false, message: "", users: [], makes: [], colours: [] };
  const prisma: PrismaClient = new PrismaClient();

  try {
    response.users = await prisma.user.findMany({ where: { isAdmin: false } });
    response.makes = await prisma.make.findMany();
    response.colours = await prisma.colour.findMany();

    response.success = true;
    response.message = "";
  } catch {
    response.success = false;
    response.message = "An error occurred during database operation";
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(response);
}

// Register API
export async function POST(req: NextRequest): Promise<NextResponse<ResponseInterface>> {
  const response: ResponseInterface = { success: false, message: "" };
  const prisma: PrismaClient = new PrismaClient();
  const data: RegisterInterface = await req.json();

  try {
    const vehicle: Vehicle | null = await prisma.vehicle.findUnique({ where: { numberPlate: data.numberPlate } });

    if (!vehicle) {
      await prisma.vehicle.create({
        data: { userID: +data.ownerID, makeID: +data.makeID, colourID: +data.colourID, numberPlate: data.numberPlate }
      });

      response.success = true;
      response.message = "Vehicle registration successful.";
    } else {
      response.success = false;
      response.message = "Vehicle is already registered.";
    }
  } catch {
    response.success = false;
    response.message = "An error occurred during database operation";
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(response);
}
