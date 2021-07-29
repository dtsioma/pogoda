import "dotenv/config";
import express from "express";
import { fetchSearchLocations } from "./fetch";

const port = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => res.send("Hello!"));

app.get("/api", (req, res) => res.send("API server"));

app.get("/api/search/:q", async (req, res) => {
  const locations = await fetchSearchLocations(req.params.q);
  res.send(locations);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
