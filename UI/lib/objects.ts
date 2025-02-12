import type { User, Vehicle } from "@prisma/client";
//
import type { ResponseInterface } from "@lib/interface";

// User Object
const userObj: User =
{
  id: 0,
  name: "",
  email: "",
  password: ""
};

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

export { userObj, vehicleObj, responseObj };