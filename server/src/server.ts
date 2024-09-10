import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get(`/hello`, (req: Request, res: Response) => {
  res.send({ message: "Hello from the Server!" });
});

app.post("/create-location", (req: Request, res: Response) => {
  console.log("Post Received");
  res.send({ message: "A new location was created!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
