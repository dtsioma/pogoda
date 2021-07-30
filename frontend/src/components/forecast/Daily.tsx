import { useState } from "react";
import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import { getWeekday } from "../../utils/weekday";
import React from "react";

interface DailyProps {
  idx: number;
  dt: number;
  iconId: string;
  tempMin: number;
  tempMax: number;
  description: string;
}

const useStyles = makeStyles((theme) => ({
  degrees: {
    lineHeight: 1,
  },
  max: {
    color: "#f44336",
  },
  min: {
    color: "#90a4ae",
  },
  weekday: {},
  daily: {
    width: "auto",
    flexaWrap: "nowrap",
  },
}));

export const Daily: React.FC<DailyProps> = ({
  idx,
  dt,
  iconId,
  tempMin,
  tempMax,
  description,
}) => {
  const classes = useStyles();
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  let weekdayStr;
  if (idx === 0) {
    weekdayStr = "Today";
  } else if (idx === 1) {
    weekdayStr = "Tomorrow";
  } else {
    const dayNumber = new Date(dt * 1000).getDay();
    weekdayStr = getWeekday(dayNumber);
  }

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      className={classes.daily}
    >
      <span className={classes.weekday}>{weekdayStr}</span>
      {imageLoading ? <CircularProgress /> : null}
      <img
        src={`http://openweathermap.org/img/wn/${iconId}@2x.png`}
        style={{ display: imageLoading ? "none" : "block" }}
        onLoad={() => {
          setImageLoading(false);
        }}
        alt={description}
      />
      <span className={classes.degrees}>
        <span className={classes.max}>{Math.round(tempMax)}&deg;</span>
        &nbsp;/&nbsp;
        <span className={classes.min}>{Math.round(tempMin)}&deg;</span>
      </span>
    </Grid>
  );
};
