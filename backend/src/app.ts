import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bookmanagement-tau.vercel.app",
    ],
  })
);

app.use(express.json());

app.use(routes);

app.get("/", (req: Request, res: Response) => {
  console.log(`Welcome To Library management System`);
  res.send({
    message: "Welcome to Library Management System",
    success: "true",
  });
});

export default app;
