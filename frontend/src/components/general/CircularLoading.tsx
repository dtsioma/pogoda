import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";

interface CircularLoadingProps {
  text: string;
}

export const CircularLoading: React.FC<CircularLoadingProps> = ({ text }) => {
  return (
    <Grid container alignItems="center" direction="column">
      <CircularProgress />
      <span style={{ marginTop: "20px" }}>{text}</span>
    </Grid>
  );
};
