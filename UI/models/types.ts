import type { User, Make, Colour, Vehicle } from "@app/generated/prisma";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// Response Interface
interface ResponseInterface {
  success: boolean;
  message: string;
}

// Token Interface
interface TokenInterface {
  userID: string;
  name: string;
  iat: string;
  exp: string;
}

// Login Interface
interface LoginInterface {
  email: string;
  password: string;
}

// Signup Interface
interface SignupInterface {
  name: string;
  email: string;
  password: string;
  repassword: string;
}

// User Interface
interface UserInterface {
  userID: string;
  name: string;
}

// Auth Context Interface
interface AuthContextInterface {
  user: UserInterface | null;
  loading: boolean;
  login: (data: LoginInterface) => Promise<ResponseInterface>;
  logout: () => Promise<ResponseInterface>;
}

// Link Interface
interface LinkInterface {
  name: string;
  icon: IconDefinition;
  url: string;
}

// Register Interface
interface RegisterInterface {
  ownerID: string;
  makeID: string;
  colourID: string;
  numberPlate: string;
}

// Register Response Interface
interface RegisterResponseInterface {
  success: boolean;
  message: string;
  users: User[];
  makes: Make[];
  colours: Colour[];
}

// Vehicle Interface
interface VehicleInterface {
  id: number;
  owner: string;
  make: string;
  colour: string;
  numberPlate: string;
}

// Remove Vehicle Interface
interface RemoveVehicleInterface {
  vehicleID: number;
}

// Remove Vehicle Response Interface
interface RemoveVehicleResponseInterface {
  success: boolean;
  message: string;
  vehicles: VehicleInterface[];
}

export type {
  ResponseInterface,
  TokenInterface,
  LoginInterface,
  SignupInterface,
  UserInterface,
  AuthContextInterface,
  LinkInterface,
  RegisterInterface,
  RegisterResponseInterface,
  VehicleInterface,
  RemoveVehicleInterface,
  RemoveVehicleResponseInterface
};
