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

export const fetchForecast = async (placeId: string) => {
  const url = `/api/forecast/${placeId}`
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options)
    .then(res => res.json())

  return response;
}