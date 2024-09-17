import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  console.log("Auth token:", token);

  if (!token) {
    console.log("No token");
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("Invalid or expired token");

    req.user = null;
    next();
  }
};
