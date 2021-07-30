import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Now } from "../components/forecast/Now";
import { fetchForecast } from "../utils/fetch";
import { ForecastResponse } from "../utils/interfaces";
import { Daily } from "../components/forecast/Daily";

interface ForecastParams {
  slug: string;
}

interface ForecastProps {
  placeId: string;
}

interface LocationState {
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

export const Forecast: React.FC<ForecastProps> = () => {
  const classes = useStyles();
  const [forecast, setForecast] = useState<ForecastResponse>();
  const { slug }: ForecastParams = useParams();
  const location = useLocation<LocationState>();
  const history = useHistory();

  useEffect(() => {
    if (!location.state) {
      history.replace("/");
      return;
    }

    (async () => {
      setForecast(await fetchForecast(location.state.placeId));
    })();
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
