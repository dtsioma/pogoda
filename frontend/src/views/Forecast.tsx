import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Now } from "../components/forecast/Now";
import {
  fetchForecastWithPlaceId,
  fetchForecastWithCoordinates,
} from "../utils/fetch";
import { ForecastResponse } from "../utils/interfaces";
import { Daily } from "../components/forecast/Daily";
import { CircularLoading } from "../components/general/CircularLoading";
import styles from "./Forecast.module.css";

interface ForecastParams {
  slug: string;
}

interface LocationState {
  name: string;
  placeId: string;
}

export const Forecast: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastResponse>();
  const { slug }: ForecastParams = useParams();
  const location = useLocation<LocationState>();
  const [name, setName] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;
    if (localStorage.getItem(slug)) {
      console.log("slug from storage!");
      // get coordinates from localStorage
      const locData: string = localStorage.getItem(slug)!;
      const [lat, lon] = locData.split("|")[1].split(",");
      // fetch forecast with coordinates
      (async () => {
        await fetchForecastWithCoordinates(lat, lon).then((resJSON) => {
          // make sure we are on mounted component
          if (isMounted) {
            setName(locData.split("|")[0]);
            setForecast(resJSON);
          }
        });
      })();
    } else if (!location.state) {
      // non-existing slug and no location state, redirect to home
      history.replace("/");
    } else if (
      location.state.name.length > 0 &&
      location.state.placeId.length > 0
    ) {
      // fetch with placeId, name exists
      (async () => {
        console.log("i'm here");
        await fetchForecastWithPlaceId(location.state.placeId).then(
          (resJSON: ForecastResponse) => {
            // make sure we are on mounted component
            if (isMounted) {
              setName(location.state.name);
              setForecast(resJSON);
              // save location data in localStorage
              localStorage.setItem(
                slug,
                `${location.state.name}|${resJSON.lat},${resJSON.lon}`
              );
            }
          }
        );
      })();
    }

    // cleanup
    return () => {
      isMounted = false;
    };
  }, [slug, location.state, history]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={styles.Forecast}
      style={{
        height: forecast ? "auto" : "100vh",
        paddingTop: forecast ? "90px" : 0,
      }}
    >
      <Grid item>
        {forecast ? (
          <>
            <Now
              name={name}
              iconId={forecast.current.weather[0].icon}
              temperature={forecast.current.temp}
              description={forecast.current.weather[0].main}
            />
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              className={styles.Container}
            >
              {forecast.daily.map((day, idx) => (
                <Daily
                  key={idx}
                  idx={idx}
                  dt={day.dt}
                  iconId={day.weather[0].icon}
                  tempMin={day.temp.min}
                  tempMax={day.temp.max}
                  description={day.weather[0].description}
                />
              ))}
            </Grid>
          </>
        ) : (
          <CircularLoading text="Loading weather data..." />
        )}
      </Grid>
    </Grid>
  );
};
