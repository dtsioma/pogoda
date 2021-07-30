import fetch from "node-fetch";
import {
  AutoCompleteResponse,
  GeocodingAddressComponent,
  LocationPrediction,
} from "./interfaces";

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

export const APIFetchCoordinates = async (placeId: string) => {
  const apiURL = process.env.COORDINATES_API_URL!;
  const apiKey = process.env.COORDINATES_API_KEY!;
  const reqURL = `${apiURL}?key=${apiKey}&place_id=${placeId}&fields=name,geometry`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(reqURL, options).then((res) => res.json());

  return {
    name: response.result.name,
    lat: response.result.geometry.location.lat,
    lon: response.result.geometry.location.lng,
  };
};

export const APIFetchName = async (lat: number, lon: number) => {
  const apiURL = process.env.GEOCODING_API_URL!;
  const apiKey = process.env.GEOCODING_API_KEY!;
  const reqURL = `${apiURL}?key=${apiKey}&latlng=${lat},${lon}&components=locality`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const name = await fetch(reqURL, options)
    .then((res) => res.json())
    .then((resJSON) => {
      if (resJSON.results.length === 0) {
        return `${lat}°, ${lon}°`;
      }
      return resJSON.results[0].address_components.filter(
        (cmp: GeocodingAddressComponent) => cmp.types.includes("locality")
      )[0]["long_name"];
    });

  return name;
};

export const APIFetchForecast = async (lat: number, lon: number) => {
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
