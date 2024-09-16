import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const SUPABASE_URL: string = process.env.SUPABASE_URL as string;
const SUPABASE_KEY: string = process.env.SUPABASE_KEY as string;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();

app.use(express.json());
app.use(cors());

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

app.post("/create-account", async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    res.send({ Message: "Invalid username or password" });
    return;
  }

  if (password != confirmPassword) {
    res.send({ Message: "Passwords do not match" });
    return;
  }

  

  res.send({ message: "Hooray from the server!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
