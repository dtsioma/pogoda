import fetch from "node-fetch";

export const fetchSearchLocations = async (q: string) => {
  const url = `http://api.weatherapi.com/v1/search.json?q=${q}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      key: process.env.WEATHER_API_KEY!,
    },
  };
  const response = await fetch(url, options).then((res) => res.json());

  return response;
};
