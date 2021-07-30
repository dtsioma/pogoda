import React, { useState } from "react";
import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import styles from "./Now.module.css";

interface NowProps {
  name: string;
  iconId: string;
  temperature: number;
  description: string;
}

export const Now: React.FC<NowProps> = ({
  name,
  iconId,
  temperature,
  description,
}) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <Grid container alignItems="center" direction="column">
      <strong className={styles.Name}>{name}</strong>
      {imageLoading ? <CircularProgress /> : null}
      <img
        src={`http://openweathermap.org/img/wn/${iconId}@4x.png`}
        style={{ display: imageLoading ? "none" : "block" }}
        onLoad={() => {
          setImageLoading(false);
        }}
        alt={description}
      />
      <strong className={styles.Degrees}>{Math.round(temperature)}</strong>
      <span className={styles.Description}>{description}</span>
    </Grid>
  );
};
