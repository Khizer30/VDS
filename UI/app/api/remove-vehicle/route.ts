import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@app/generated/prisma";
//
import type {
  ResponseInterface,
  VehicleInterface,
  RemoveVehicleInterface,
  RemoveVehicleResponseInterface
} from "@models/types";

// Remove Vehicle API
export async function GET(): Promise<NextResponse<RemoveVehicleResponseInterface>> {
  const response: RemoveVehicleResponseInterface = { success: false, message: "", vehicles: [] };
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

// Remove Vehicle API
export async function POST(req: NextRequest): Promise<NextResponse<ResponseInterface>> {
  const response: ResponseInterface = { success: false, message: "" };
  const prisma: PrismaClient = new PrismaClient();
  const data: RemoveVehicleInterface = await req.json();

  try {
    await prisma.vehicle.delete({ where: { id: data.vehicleID } });

    response.success = true;
    response.message = "Vehicle deleted successfully.";
  } catch {
    response.success = false;
    response.message = "An error occurred during database operation";
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(response);
}
