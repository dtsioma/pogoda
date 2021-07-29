import { makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

interface ForecastParams {
  slug: string;
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

export const Forecast: React.FC = () => {
  const { slug }: ForecastParams = useParams();
  const classes = useStyles();

  return <div className={classes.container}>{slug}</div>;
};
