import type { Make, Colour, Detection } from "@prisma/client";
//
import prisma from "@lib/prisma";
import type { MakesAndColoursInterface } from "@lib/interface";

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

// Fetch Make & Colour
async function fetchMakeAndColour(): Promise<MakesAndColoursInterface>
{
  let makes: Make[] = [];
  let colours: Colour[] = [];

  try
  {
    makes = await prisma.make.findMany();
    colours = await prisma.colour.findMany();
  }
  catch (error: unknown)
  {
    console.error(error);
  }
  finally
  {
    await prisma.$disconnect();
  }

  return { makes, colours };
}

export { fetchDetections, fetchMakeAndColour };