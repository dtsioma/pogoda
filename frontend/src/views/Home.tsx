import { useEffect } from "react";
import { Grid, TextField, makeStyles, Theme, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import NearMeIcon from "@material-ui/icons/NearMe";
import { ChangeEvent, useState } from "react";
import { fetchLocations } from "../utils/fetch";
import { AutoCompleteOption } from "../utils/interfaces";

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

const Home = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const [shrink, setShrink] = useState<boolean>(false);
  const [locationOptions, setLocationOptions] = useState<AutoCompleteOption[]>(
    []
  );
  const [autoCompleteJSX, setAutoCompleteJSX] = useState<JSX.Element>();

  const handleFocus = () => {
    setShrink(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        setLoading(true);
        const results = await fetchLocations(e.target.value);
        setLocationOptions(results);
        setLoading(false);
      }, 500);
    } else {
      setLocationOptions([]);
    }
  };

  useEffect(() => {
    console.log({ loading });
    setAutoCompleteJSX(
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        disableClearable
        loading={loading}
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
    );
    // eslint-disable-next-line
  }, [loading, locationOptions, shrink, classes.icon, classes.labelNotShrink]);

  const handleBlur = (e: any) => {
    if (e.target.value.length === 0) {
      setShrink(false);
    }
  };

  let timer: ReturnType<typeof setTimeout>;

  // const searchLocations = async (q: string) => {
  //   const locations = await fetchLocations(q);
  //   console.log("search locations");
  //   return locations;
  // };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item className={classes.form}>
        {autoCompleteJSX}
      </Grid>
    </Grid>
  );
};

export default Home;
