import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
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

interface ForecastParams {
  slug: string;
}

interface LocationState {
  name: string;
  placeId: string;
}

const useStyles = makeStyles((theme) => ({
  forecast: {
    width: "100vw",
    height: "100vh",
  },
  dailyContainer: {
    marginTop: "5em",
  },
}));

export const Forecast: React.FC = () => {
  const classes = useStyles();
  const [forecast, setForecast] = useState<ForecastResponse>();
  const { slug }: ForecastParams = useParams();
  const location = useLocation<LocationState>();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem(slug)) {
      // get coordinates from localStorage
      const locData: string = localStorage.getItem(slug)!;
      const [lat, lon] = locData.split("|")[1].split(",");
      // fetch forecast with coordinates
      (async () => {
        const response = await fetchForecastWithCoordinates(lat, lon).then(
          (resJSON) => {
            setForecast(resJSON);
          }
        );
      })();
    } else if (
      location.state.name.length > 0 &&
      location.state.placeId.length > 0
    ) {
      // fetch with placeId, name exists
      (async () => {
        const response = await fetchForecastWithPlaceId(
          location.state.placeId
        ).then((resJSON: ForecastResponse) => {
          setForecast(resJSON);
          // save location data in localStorage
          localStorage.setItem(
            slug,
            `${location.state.name}|${resJSON.lat},${resJSON.lon}`
          );
        });
      })();
    }

    // if (location.state) {
    //   // placeId from location state
    //   (async () => {
    //     localStorage.setItem(slug, location.state.placeId);
    //     setForecast(await fetchForecast(location.state.placeId));
    //   })();
    // } else if (localStorage[slug]) {
    //   // placeId from localStorage
    //   (async () => {
    //     setForecast(await fetchForecast(localStorage[slug]));
    //   })();
    // } else {
    //   // no placeId, redirect
    //   history.replace("/");
    // }
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.forecast}
    >
      <Grid item>
        {forecast ? (
          <>
            <Now
              name={forecast.name}
              iconId={forecast.current.weather[0].icon}
              temperature={forecast.current.temp}
              description={forecast.current.weather[0].main}
            />
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              className={classes.dailyContainer}
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
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );
};
