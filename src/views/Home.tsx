import { Grid, TextField, makeStyles, Theme, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import NearMeIcon from "@material-ui/icons/NearMe";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
  },
  paper: {
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
  },
  input: {
    padding: "10px",
  },
  icon: {
    color: theme.palette.primary.main,
  },
  form: {
    width: "400px",
  },
  labelNotShrink: {
    transform: "translate(40px, 21px) scale(1)",
  },
}));

interface LocationResponseItem {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

interface LocationOption {
  id: number;
  name: string;
}

const Home = () => {
  const classes = useStyles();
  const [shrink, setShrink] = useState<boolean>(false);
  const [locationOptions, setLocationOptions] = useState<LocationOption[]>([]);

  const handleFocus = () => {
    setShrink(true);
  };

  const handleBlur = (e: any) => {
    if (e.target.value.length === 0) {
      setShrink(false);
    }
  };

  let timer: ReturnType<typeof setTimeout>;

  const handleChange = () => {
    clearTimeout(timer);
    timer = setTimeout(searchLocations, 1000);
  };

  const searchLocations = () => {
    console.log("search locations");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item className={classes.form}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          disableClearable
          options={locationOptions.map((option) => option.name)}
          noOptionsText="No results"
          style={{ flex: 1 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Your location"
              margin="normal"
              variant="outlined"
              onFocus={handleFocus}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: shrink,
                className: shrink ? undefined : classes.labelNotShrink,
              }}
              InputProps={{
                ...params.InputProps,
                onChange: handleChange,
                startAdornment: <NearMeIcon className={classes.icon} />,
                endAdornment: (
                  <Button color="primary" variant="contained">
                    Auto
                  </Button>
                ),
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
