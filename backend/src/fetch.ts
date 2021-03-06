import fetch from "node-fetch";
import { AutoCompleteResponse, LocationPrediction } from "./interfaces";

export const APIFetchLocations = async (q: string) => {
  const apiURL = process.env.AUTOCOMPLETE_API_URL!;
  const apiKey = process.env.AUTOCOMPLETE_API_KEY!;
  const reqURL = `${apiURL}?key=${apiKey}&types=geocode&input=${q}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(reqURL, options)
    .then((res) => res.json())
    .then((resJSON: AutoCompleteResponse) => {
      return resJSON.predictions.map((loc: LocationPrediction, id: number) => ({
        id,
        placeId: loc.place_id,
        name: loc.description,
      }));
    });

  return response;
};

export const APIFetchCoordinatesWithPlaceId = async (placeId: string) => {
  const apiURL = process.env.COORDINATES_API_URL!;
  const apiKey = process.env.COORDINATES_API_KEY!;
  const reqURL = `${apiURL}?key=${apiKey}&place_id=${placeId}&fields=geometry`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(reqURL, options).then((res) => res.json());

  return {
    lat: response.result.geometry.location.lat,
    lon: response.result.geometry.location.lng,
  };
};

export const APIFetchForecastWithCoordinates = async (
  lat: string,
  lon: string
) => {
  const apiURL = process.env.WEATHER_API_URL!;
  const apiKey = process.env.WEATHER_API_KEY!;
  const reqURL = `${apiURL}?appId=${apiKey}&lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(reqURL, options).then((res) => res.json());

  return response;
};

export const APIFetchNameWithCoordinates = async (lat: string, lon: string) => {
  const apiURL = process.env.GEOCODING_API_URL!;
  const apiKey = process.env.GEOCODING_API_KEY!;
  const reqURL = `${apiURL}?key=${apiKey}&latlng=${lat},${lon}&result_type=locality`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(reqURL, options).then((res) => res.json());

  const name = response.results[0].formatted_address;

  return { name };
};
