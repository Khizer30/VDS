// Response Interface
interface ResponseInterface {
  success: boolean;
  message: string;
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

export type { ResponseInterface, LoginInterface, SignupInterface };
