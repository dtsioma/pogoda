import "dotenv/config";
import express from "express";
import { APIFetchLocations } from "./fetch";
import cors from "cors";

const port = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Hello!"));

app.get("/api", (req, res) => res.send("API server"));

app.get("/api/search/:q", async (req, res) => {
  const locations = await APIFetchLocations(req.params.q);
  res.send(locations);
});

// app.get("/api/forecast/:q", async (req, res) => {
//   const locations = await APIFetchForecast(req.params.q);
//   res.send(locations);
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
