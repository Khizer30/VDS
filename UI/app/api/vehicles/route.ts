import { NextResponse } from "next/server";
import { PrismaClient } from "@app/generated/prisma";
//
import type { VehicleInterface, VehiclesResponseInterface } from "@models/types";

// Vehicles API
export async function GET(): Promise<NextResponse<VehiclesResponseInterface>> {
  const response: VehiclesResponseInterface = { success: false, message: "", vehicles: [] };
  const prisma: PrismaClient = new PrismaClient();

  try {
    const data = await prisma.vehicle.findMany({
      select: {
        id: true,
        user: { select: { name: true } },
        make: { select: { name: true } },
        colour: { select: { name: true } },
        numberPlate: true
      }
    });

    for (let i: number = 0; i < data.length; i++) {
      const vehicle: VehicleInterface = {
        id: data[i].id,
        owner: data[i].user.name,
        make: data[i].make.name,
        colour: data[i].colour.name,
        numberPlate: data[i].numberPlate
      };

      response.vehicles.push(vehicle);
    }

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
