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
import { authenticateJWT } from "./middleware/authMiddleware";
var cookieParser = require("cookie-parser");

dotenv.config();
const clientUrl = "http://localhost:5173";

const app = express();

app.use(express.json());
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(cookieParser());

app.post("/create-location", async (req: Request, res: Response) => {
  const { locationId } = req.body;

  insertLocationId(locationId);

  res.send({ message: "A new location was created!", locationId: locationId });
});

app.get("/location/:locationId", async (req: Request, res: Response) => {
  const { locationId } = req.params;

  const locationIdData = (await getLocationId(locationId)) as any[];

  if (locationIdData.length == 0) {
    return res.send({ isLocation: false });
  }

  const locationTableId = locationIdData[0].id;

  const locationEntries = (await getEntry(locationTableId)) as any[];

  if (locationEntries.length == 0) {
    return res.send({ isLocation: true, isEntry: false });
  }

  res.send({ isLocation: true, isEntry: true, entry: locationEntries });
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
    console.log("Login token", token);

    res.cookie("token", token),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 3600000,
      };

    const decoded = jwt.verify(token, JWT_SECRET);

    return res.send({
      message: "Yay, Logged In",
      isLoggedIn: true,
      user: decoded,
    });
  } else {
    return res.send({
      message: "Incorrect email or password.",
      isLoggedIn: false,
    });
  }
});

app.post("/logout", (req: Request, res: Response) => {
  console.log("Attempting logout");
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.send({ message: "Logged Out" });
});

app.post(
  "/create-entry",
  authenticateJWT,
  async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.user);
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
