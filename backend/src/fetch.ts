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
      return resJSON.predictions.map(
        (loc: LocationPrediction, id: number) => ({
          id,
          name: loc.description,
        })
      );
    });

  return response;
};
