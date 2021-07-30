import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

interface NowProps {
  name: string;
  iconId: string;
  temperature: number;
  description: string;
}

const useStyles = makeStyles((theme) => ({
  degrees: {
    color: theme.palette.primary.main,
    fontSize: "3em",
    lineHeight: 1,
    position: "relative",
    "&::after": {
      content: '"°"',
      position: "absolute",
      top: 0,
    },
  },
  description: {
    fontSize: "1em",
    marginTop: "1em",
  },
  now: {
    backgroundColor: "white",
  },
  name: {
    fontSize: "2em",
  },
}));

export const Now: React.FC<NowProps> = ({
  name,
  iconId,
  temperature,
  description,
}) => {
  const classes = useStyles();
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <Grid container alignItems="center" direction="column">
      <strong className={classes.name}>{name}</strong>
      {imageLoading ? <CircularProgress /> : null}
      <img
        src={`http://openweathermap.org/img/wn/${iconId}@4x.png`}
        style={{ display: imageLoading ? "none" : "block" }}
        onLoad={() => {
          setImageLoading(false);
        }}
        alt={description}
      />
      <strong className={classes.degrees}>{Math.round(temperature)}</strong>
      <span className={classes.description}>{description}</span>
    </Grid>
  );
};
