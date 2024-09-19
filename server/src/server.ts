import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import {
  getEntry,
  getLocationId,
  getUser,
  insertEntry,
  insertLocationId,
  insertUser,
} from "./utils/supabase";
import { authenticateJWT } from "./middleware/authMiddleware";
import { generateToken, JWT_SECRET } from "./utils/jwt";
var cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
const clientUrl = "http://localhost:5173";

/* 3RD-PARTY MIDDLEWARE */
app.use(express.json());
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(cookieParser());

app.get("/test", (req: Request, res: Response) => {
  res.send({ message: "Test Response" });
});

/* HANDLE LOCATION CREATION */
app.post("/create-location", async (req: Request, res: Response) => {
  // Receive UUID from client
  const { locationId } = req.body;

  insertLocationId(locationId);

  res.send({ message: "A new location was created!", locationId: locationId });
});

/* HANDLE LOCATION DISPLAY */
app.get("/location/:locationId", async (req: Request, res: Response) => {
  const { locationId } = req.params;

  // Check if location exists
  const locationIdData = (await getLocationId(locationId)) as any[];
  if (locationIdData.length == 0) {
    return res.send({ isLocation: false });
  }

  // If exists, get location id
  const locationTableId = locationIdData[0].id;

  // Check if location entries exist
  const locationEntries = (await getEntry(locationTableId)) as any[];
  if (locationEntries.length == 0) {
    return res.send({ isLocation: true, isEntry: false });
  }

  res.send({ isLocation: true, isEntry: true, entry: locationEntries });
});

/* RETURN LOCATIONS PERTAINING TO SPECIFIC USER */
app.get(
  "/user-location",
  authenticateJWT,
  async (req: Request, res: Response) => {
    console.log(req.user);

    const userDataByEmail = (await getUser("email", req.user.email)) as any[];
    const userId = userDataByEmail[0].id;

    
  }
);

/* HANDLE USER REGISTRATION */
app.post("/register", async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  // VALIDATE INPUTS ON SERVER-SIDE
  // Check all inputs fulfilled
  if (!username || !email || !password || !confirmPassword) {
    res.send({ message: "Invalid username or password" });
    return;
  }

  // Check for matching passwords
  if (password != confirmPassword) {
    res.send({ message: "Passwords do not match" });
    return;
  }

  // Check for unique username
  const userDataByUsername = await getUser("username", username);
  if (userDataByUsername?.length != 0) {
    res.send({ message: "Username already exists." });
    return;
  }

  // Check for unique email
  const userDataByEmail = await getUser("email", email);
  if (userDataByEmail?.length != 0) {
    res.send({ message: "Email already exists." });
    return;
  }

  // CREATE THE ACCOUNT
  // Hash submitted password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insert submitted user into database
  insertUser(username, email, hashedPassword);

  res.send({
    message: "Account Created! Click here to login",
    isRegistered: true,
  });
});

/* HANDLE USER AUTH (INITIAL CLIENT LOAD) */
app.get("/auth", authenticateJWT, (req, res) => {
  console.log("auth attempting");
  if (req.user) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false, user: req.user });
  }
});

/* HANDLE USER LOGIN */
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //TO DO: Login Server-Side Validation

  // Get user data for user submitted email
  const userData = (await getUser("email", email)) as any[];

  // Check if user exists, return if not
  if (userData?.length == 0) {
    res.send({ message: "Incorrect email or password." });
    return;
  }

  // Check if user submitted password matches hashed password
  const isPasswordMatch = await bcrypt.compare(password, userData[0].password);

  if (isPasswordMatch) {
    const token = generateToken(email);

    // Create http cookie with 1hr expiration
    res.cookie("token", token),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 3600000,
      };

    // Decode token to send user email, init time, and exp time
    const decoded = jwt.verify(token, JWT_SECRET);

    return res.send({
      message: "Yay, Logged In",
      isLoggedIn: true,
      user: decoded,
    });
  }
  // Catch if passwords do not match
  else {
    return res.send({
      message: "Incorrect email or password.",
      isLoggedIn: false,
    });
  }
});

/* HANDLE USER LOGOUT */
app.post("/logout", (req: Request, res: Response) => {
  // Clear http cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.send({ message: "Logged Out" });
});

/* HANDLE USER ENTRY CREATION */
app.post(
  "/entry/:locationId",
  authenticateJWT,
  async (req: Request, res: Response) => {
    const { locationId } = req.params;
    const { coords, formData } = req.body;

    //TO DO: validate form input

    // Get foreign key id for location
    const locationIdData = (await getLocationId(locationId)) as any[];
    const locationTableId = locationIdData[0].id;

    // If first entry, update coords for location
    const oneEntryData = await getOneEntry(locationTableId);
    if (oneEntryData?.length == 0) {
      updateLocationCoords(locationTableId, coords);
    }

    if (req.user) {
      // Get foreign key id for user
      const userDataByEmail = (await getUser("email", req.user.email)) as any[];
      const userId = userDataByEmail[0].id;

      // Add to 'entry' table
      insertEntry(userId, locationTableId, formData.message);

      res.send({ message: "User entry added" });
    }
    // If not, handle as a guest
    else {
      // Get foreign key id for guest
      const userDataByUsername = (await getUser("username", "Guest")) as any[];
      const userId = userDataByUsername[0].id;

      // Add to 'entry' table
      insertEntry(userId, locationTableId, formData.message);

      res.send({ message: "Guest entry added" });
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
