import React, { useState } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { getWeekday } from "../../utils/weekday";
import styles from "./Daily.module.css";

interface DailyProps {
  idx: number;
  dt: number;
  iconId: string;
  tempMin: number;
  tempMax: number;
  description: string;
}

export const Daily: React.FC<DailyProps> = ({
  idx,
  dt,
  iconId,
  tempMin,
  tempMax,
  description,
}) => {
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
      className={styles.Daily}
    >
      <span>{weekdayStr}</span>
      {imageLoading ? <CircularProgress /> : null}
      <img
        src={`http://openweathermap.org/img/wn/${iconId}@2x.png`}
        style={{ display: imageLoading ? "none" : "block" }}
        onLoad={() => {
          setImageLoading(false);
        }}
        alt={description}
        className={styles.Icon}
      />
      <span className={styles.Degrees}>
        <span className={styles.Max}>{Math.round(tempMax)}&deg;</span>
        &nbsp;/&nbsp;
        <span className={styles.Min}>{Math.round(tempMin)}&deg;</span>
      </span>
    </Grid>
  );
};
