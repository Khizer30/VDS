import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@app/generated/prisma";
//
import type { ResponseInterface, RemoveVehicleInterface } from "@models/types";

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
