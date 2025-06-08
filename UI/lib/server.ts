import { supabase } from "@lib/supabase";
import type { Make, Colour, User, Detection } from "@prisma/client";
//
import prisma from "@lib/prisma";
import type { MakesAndColoursInterface } from "@lib/interface";

// Server Fetch Detections
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

// Server Fetch Make & Colour
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

// Client Fetch User
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

// Client Fetch Recent Detection
async function fetchRecentDetection(email: string): Promise<{ name: string, detection: Detection | null; }>
{
  let name: string = "";
  let detection: Detection | null = null;

  let { data: userData } = await supabase
    .from("User")
    .select("name, id")
    .eq("email", email)
    .single();

  if (userData)
  {
    name = userData.name;

    let { data: vehicleData } = await supabase
      .from("Vehicle")
      .select("id")
      .eq("userID", userData.id);

    if (vehicleData && vehicleData.length !== 0)
    {
      let vehicleIDs: number[] = vehicleData.map(v => v.id);

      let { data: detectionData } = await supabase
        .from("Detection")
        .select("*")
        .in("vehicleID", vehicleIDs)
        .order("timestamp", { ascending: false })
        .limit(1);

      if (detectionData && detectionData.length !== 0)
      {
        detection = detectionData[0];
      }
    }
  }

  return { name, detection };
}

export { fetchDetections, fetchMakeAndColour, fetchUser, fetchRecentDetection };