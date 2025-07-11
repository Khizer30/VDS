import { NextResponse } from "next/server";
import { PrismaClient } from "@app/generated/prisma";
import { startOfWeek, endOfWeek } from "date-fns";
//
import type { DetectionInterface, DashboardResponseInterface } from "@models/types";

// Dashboard API
export async function GET(): Promise<NextResponse<DashboardResponseInterface>> {
  const response: DashboardResponseInterface = {
    success: false,
    message: "",
    dailyDetections: { days: [], counts: [] },
    detections: []
  };
  const prisma: PrismaClient = new PrismaClient();

  try {
    const today: Date = new Date();
    const weekStart: Date = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd: Date = endOfWeek(today, { weekStartsOn: 1 });
    const counts: number[] = [0, 0, 0, 0, 0, 0, 0];

    const dailyData = await prisma.detection.findMany({
      select: { timestamp: true },
      where: { timestamp: { gte: weekStart, lte: weekEnd } }
    });

    for (const detection of dailyData) {
      const dayIndex: number = new Date(detection.timestamp).getDay();
      const adjustedIndex: number = (dayIndex + 6) % 7;

      counts[adjustedIndex] += 1;
    }

    response.dailyDetections.days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    response.dailyDetections.counts = counts;

    const data = await prisma.detection.findMany({
      select: {
        id: true,
        make: true,
        colour: true,
        numberPlate: true,
        timestamp: true,
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
      },
      take: 10
    });

    for (let i: number = 0; i < data.length; i++) {
      const tempDetection: DetectionInterface = {
        id: data[i].id,
        makeDetected: data[i].make,
        makeExpected: data[i].vehicle.make.name,
        colourDetected: data[i].colour,
        colourExpected: data[i].vehicle.colour.name,
        numberPlate: data[i].numberPlate,
        timestamp: data[i].timestamp
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
