import { supabase } from "@lib/supabase";
import type { Make, Colour, User, Detection } from "@prisma/client";
//
import prisma from "@lib/prisma";

// Client Fetch Detections
async function fetchDetections(email: string): Promise<Detection[]>
{
  let detections: Detection[] = [];

  let { data: userData } = await supabase
    .from("User")
    .select("id")
    .eq("email", email)
    .single();

  if (userData)
  {
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
        .order("timestamp", { ascending: false });

      if (detectionData && detectionData.length !== 0)
      {
        detections = detectionData;
      }
    }
  }

  return detections;
}

// Server Fetch Make & Colour
async function fetchMakeAndColour(): Promise<{ makes: Make[], colours: Colour[]; }>
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

  let { data } = await supabase
    .from("User")
    .select("id, name, email")
    .eq("email", email)
    .single();

  if (data)
  {
    user = { id: data.id, name: data.email, email: data.email, password: "" };
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