import bcrypt from "bcryptjs";

// Hash Password
export async function hashPassword(password: string): Promise<string> {
  const salt: string = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
}

// Compare Password
export async function comparePasswords(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}
