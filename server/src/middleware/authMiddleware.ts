import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/jwt";

// HANDLES AUTHENTICATION OF JWT FROM HTTP COOKIE
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get token from http cookie
  const token = req.cookies.token;

  if (!token) {
    console.log("No token");
    req.user = null;
    return next();
  }

  // If token...
  try {
    // Verify token is valid & active
    const decoded = jwt.verify(token, JWT_SECRET);

    // Add user prop to request with email, init date, and exp date
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Invalid or expired token");
    req.user = null;
    next();
  }
};
