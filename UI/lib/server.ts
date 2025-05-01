import type { Detection } from "@prisma/client";
//
import prisma from "@lib/prisma";

// Fetch Detections
async function fetchDetections(userID: number): Promise<Detection[]>
{
  let detections: Detection[] = [];

  try
  {
    detections = await prisma.detection.findMany({ where: { vehicle: { user: { id: userID } } }, orderBy: { timestamp: "desc" } });
  }
  catch (error: unknown)
  {
    console.error(error);
  }
  finally
  {
    await prisma.$disconnect();
  }

  return detections;
}

export { fetchDetections };