import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Now } from "../components/forecast/Now";
import { fetchForecast } from "../utils/fetch";
import { ForecastResponse } from "../utils/interfaces";

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
          <Now
            iconId={forecast.current.weather[0].icon}
            temperature={Math.round(forecast.current.temp)}
            description={forecast.current.weather[0].main}
          />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );
};
