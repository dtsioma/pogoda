import { makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

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
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
  },
}));

export const Forecast: React.FC<ForecastProps> = () => {
  const classes = useStyles();
  const { slug }: ForecastParams = useParams();
  const location = useLocation<LocationState>();
  const history = useHistory();

  console.log(location);

  if (!location.state) {
    history.replace("/");
    return null;
  }

  return (
    <div className={classes.container}>
      Slug: {slug}
      PlaceId: {location.state.placeId}
    </div>
  );
};
