import "dotenv/config";
import express from "express";
import {
  APIFetchCoordinatesWithPlaceId,
  APIFetchForecastWithCoordinates,
  APIFetchLocations,
  APIFetchNameWithCoordinates,
} from "./fetch";
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

app.get("/api/forecast/coordinates/:lat/:lon", async (req, res) => {
  const locations = await APIFetchForecastWithCoordinates(
    req.params.lat,
    req.params.lon
  );
  res.send(locations);
});

app.get("/api/forecast/placeId/:placeId", async (req, res) => {
  const { lat, lon } = await APIFetchCoordinatesWithPlaceId(req.params.placeId);
  const forecast = await APIFetchForecastWithCoordinates(lat, lon);
  res.send(forecast);
});

app.get("/api/name/coordinates/:lat/:lon", async (req, res) => {
  const name = await APIFetchNameWithCoordinates(
    req.params.lat,
    req.params.lon
  );
  res.send(name);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
