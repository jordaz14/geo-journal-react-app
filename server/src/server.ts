import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import {
  getLocationId,
  getUser,
  insertLocationId,
  insertUser,
} from "./utils/supabase";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const SUPABASE_URL: string = process.env.SUPABASE_URL as string;
const SUPABASE_KEY: string = process.env.SUPABASE_KEY as string;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();

app.use(express.json());
app.use(cors());

const JWT_SECRET: string = process.env.JWT_SECRET as string;

app.get("/hello", (req: Request, res: Response) => {
  res.send({ message: "Hello from the Server!" });
});

app.post("/create-location", async (req: Request, res: Response) => {
  const { locationId } = req.body;

  insertLocationId(locationId);

  res.send({ message: "A new location was created!", locationId: locationId });
});

app.get("/location/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const locationIdData = (await getLocationId(id)) as any[];

  if (locationIdData.length == 0) {
    return res.send({ isLocation: false });
  }

  res.send({ isLocation: true });
});

app.post("/register", async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  // Server-side validation
  if (!username || !email || !password || !confirmPassword) {
    res.send({ message: "Invalid username or password" });
    return;
  }

  if (password != confirmPassword) {
    res.send({ message: "Passwords do not match" });
    return;
  }

  const userDataByUsername = await getUser("username", username);
  if (userDataByUsername?.length != 0) {
    res.send({ message: "Username already exists." });
    return;
  }

  const userDataByEmail = await getUser("email", email);
  if (userDataByEmail?.length != 0) {
    res.send({ message: "Email already exists." });
    return;
  }

  // Password hashing
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insert user into database
  insertUser(username, email, hashedPassword);

  res.send({ message: "Account Created! Click here to login" });
});

app.get("/auth", authenticateJWT, (req, res) => {
  console.log("Received auth-status request");

  if (req.user) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false, user: req.user });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userData = (await getUser("email", email)) as any[];

  if (userData?.length == 0) {
    res.send({ message: "Incorrect email or password." });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(password, userData[0].password);

  if (isPasswordMatch) {
    const token = generateToken(email);
    return res.send({ message: "Logging In", token: token });
  } else {
    return res.send({ message: "Incorrect email or password." });
  }
});

app.post("/create-entry", async (req: Request, res: Response) => {
  console.log(req.body)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const generateToken = (email: string) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1hr" });
};
