import type { User, Vehicle, Detection } from "@prisma/client";
//
import type { ResponseInterface, SignupInputsInterface, AuthContextInterface } from "@lib/interface";

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
  makeID: 0,
  colourID: 0,
  userID: 0,
  numberPlate: ""
};

// Detection Object
const detectionObj: Detection =
{
  id: 0,
  make: "",
  colour: "",
  numberPlate: "",
  timestamp: new Date(),
  vehicleID: 0
};

// Response Object
const responseObj: ResponseInterface =
{
  success: true,
  message: ""
};

// Signup Inputs Object
const signupInputsObj: SignupInputsInterface =
{
  email: "",
  name: "",
  password: "",
  repassword: ""
};

// Auth Context Object
const authContextObj: AuthContextInterface =
{
  user: null,
  loading: true
};

export { userObj, vehicleObj, detectionObj, responseObj, signupInputsObj, authContextObj };