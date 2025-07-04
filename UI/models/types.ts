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
}

export type { ResponseInterface, TokenInterface, LoginInterface, SignupInterface, UserInterface, AuthContextInterface };
