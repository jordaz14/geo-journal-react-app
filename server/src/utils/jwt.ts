import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

// GET JWT SECRET SIGNATURE
export const JWT_SECRET: string = process.env.JWT_SECRET as string;

// HANDLES JWT TOKEN CREATION
export const generateToken = (email: string) => {
  // Create token with email payload, secret key, and expiration time
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1hr" });
};
