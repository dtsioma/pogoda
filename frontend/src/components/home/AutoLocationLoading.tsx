import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";

export const AutoLocationLoading: React.FC = () => {
  return (
    <Grid container alignItems="center" direction="column">
      <CircularProgress />
      <span style={{ marginTop: "20px" }}>Detecting your location...</span>
    </Grid>
  );
};
