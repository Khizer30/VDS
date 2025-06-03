import { supabase } from "@lib/supabase";
import type { Make, Colour, User, Detection } from "@prisma/client";
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

// Fetch User
async function fetchUser(email: string): Promise<User | null>
{
  let user: User | null = null;

  const data = await supabase.from("User").select("id, name, email").eq("email", email);

  if (data.data && data.data.length != 0)
  {
    user = { id: data.data[0].id, name: data.data[0].name, email: data.data[0].email, password: "" };
  }

  return user;
}

export { fetchDetections, fetchMakeAndColour, fetchUser };