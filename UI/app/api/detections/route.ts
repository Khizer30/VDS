import { NextResponse } from "next/server";
import { PrismaClient } from "@app/generated/prisma";
//
import type { DetectionInterface, DetectionResponseInterface } from "@models/types";

// Detections API
export async function GET(): Promise<NextResponse<DetectionResponseInterface>> {
  const response: DetectionResponseInterface = { success: false, message: "", detections: [] };
  const prisma: PrismaClient = new PrismaClient();

  try {
    const data = await prisma.detection.findMany({
      select: {
        id: true,
        make: true,
        colour: true,
        numberPlate: true,
        timestamp: true,
        type: true,
        vehicle: {
          select: {
            make: {
              select: {
                name: true
              }
            },
            colour: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        timestamp: "desc"
      }
    });

    for (let i: number = 0; i < data.length; i++) {
      const tempDetection: DetectionInterface = {
        id: data[i].id,
        makeDetected: data[i].make,
        makeExpected: data[i].vehicle.make.name,
        colourDetected: data[i].colour,
        colourExpected: data[i].vehicle.colour.name,
        numberPlate: data[i].numberPlate,
        timestamp: data[i].timestamp,
        type: data[i].type
      };

      response.detections.push(tempDetection);
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
