import { useEffect } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Theme,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import NearMeIcon from "@material-ui/icons/NearMe";
import { ChangeEvent, useState } from "react";
import { fetchLocations, fetchNameWithCoordinates } from "../utils/fetch";
import { AutoCompleteOption } from "../utils/interfaces";
import { useHistory } from "react-router-dom";
import { getSlugFromName } from "../utils/location-name-slug";

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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  const [autoCompleteJSX, setAutoCompleteJSX] = useState<JSX.Element>(
    <CircularProgress size={60} />
  );
  const history = useHistory();

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

  const handleAutoLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGeocode, handleError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const handleGeocode = async (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);

    await fetchNameWithCoordinates(lat, lon).then((res) => {
      const slug = getSlugFromName(res.name);
      localStorage.setItem(slug, `${res.name}|${lat},${lon}`);
      history.push(`/${slug}`);
    });
  };

  const handleError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      default:
        console.log("An unknown error occurred.");
        break;
    }
  };

  useEffect(() => {
    setAutoCompleteJSX(
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        disableClearable
        loading={loading}
        onChange={(event, value) => {
          if (value) {
            console.log();
            const opts = locationOptions.filter((opt) => opt.name === value);
            if (opts.length > 0) {
              const optionPlaceId = opts[0].placeId;
              const slug = getSlugFromName(value);
              history.push(`/${slug}`, { name: value, placeId: optionPlaceId });
            }
          }
        }}
        options={locationOptions.map((option) => option.name)}
        noOptionsText="No results"
        style={{ flex: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Your location"
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
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleAutoLocate}
                >
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
