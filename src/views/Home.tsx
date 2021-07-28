import { Grid, Input, makeStyles, Paper, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    flex: 1,
  },
  container: {
    width: "100vw",
    height: "100vh",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Paper component="form">
        <Input placeholder="Enter your location" className={classes.input} />
      </Paper>
    </Grid>
  );
};

export default Home;
