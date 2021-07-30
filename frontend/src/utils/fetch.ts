import { AutoCompleteOption } from "./interfaces";

export const fetchLocations = async (q: string) => {
  const url = `/api/search/${q}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options)
    .then((res) => res.json())
    .then((resJSON: AutoCompleteOption[]) => resJSON);

  return response;
};

export const fetchForecastWithCoordinates = async (
  lat: string,
  lon: string
) => {
  const url = `/api/forecast/coordinates/${lat}/${lon}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options).then((res) => res.json());

  return response;
};

export const fetchForecastWithPlaceId = async (placeId: string) => {
  const url = `/api/forecast/placeId/${placeId}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options).then((res) => res.json());
  console.log(response);

  return response;
};
