import type { Vehicle } from "@prisma/client";
//
import type { ResponseInterface } from "@lib/interface";

// Vehicle Object
const vehicleObj: Vehicle =
{
  id: 0,
  make: "",
  colour: "",
  numberPlate: "",
  userID: 0
};

// Response Object
const responseObj: ResponseInterface =
{
  success: true,
  message: ""
};

export { vehicleObj, responseObj };