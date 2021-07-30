import { useEffect } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Theme,
  Button,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import NearMeIcon from "@material-ui/icons/NearMe";
import { ChangeEvent, useState } from "react";
import { fetchLocations, fetchNameWithCoordinates } from "../utils/fetch";
import { AutoCompleteOption } from "../utils/interfaces";
import { useHistory } from "react-router-dom";
import { getSlugFromName } from "../utils/location-name-slug";
import { CircularLoading } from "../components/general/CircularLoading";
import styles from "./Home.module.css";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [shrink, setShrink] = useState<boolean>(false);
  const [locationOptions, setLocationOptions] = useState<AutoCompleteOption[]>(
    []
  );
  const [autoCompleteJSX, setAutoCompleteJSX] = useState<JSX.Element>(
    <CircularProgress size={60} />
  );
  const [autoLocationLoading, setAutoLocationLoading] =
    useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");
  const history = useHistory();

  const handleFocus = () => {
    if (!showAlert) {
      setShrink(true);
    }
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
    console.log("auto locate");
    setShrink(false);
    if (navigator.geolocation) {
      setAutoLocationLoading(true);
      navigator.geolocation.getCurrentPosition(handleGeocode, handleError);
    } else {
      setAutoLocationLoading(false);
      setAlertText("Geolocation is not supported by this browser.");
      setShowAlert(true);
    }
  };

  const handleGeocode = async (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    await fetchNameWithCoordinates(lat, lon).then((res) => {
      const slug = getSlugFromName(res.name);
      localStorage.setItem(slug, `${res.name}|${lat},${lon}`);
      history.push(`/${slug}`);
    });
  };

  const handleError = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setAutoLocationLoading(false);
        setAlertText(
          "Location access is disabled. Enable it or enter location manually."
        );
        setShowAlert(true);
        break;
      case error.POSITION_UNAVAILABLE:
        setAutoLocationLoading(false);
        setAlertText("Location information is unavailable.");
        setShowAlert(true);
        break;
      case error.TIMEOUT:
        setAutoLocationLoading(false);
        setAlertText("The request to get user location timed out.");
        setShowAlert(true);
        break;
      default:
        setAutoLocationLoading(false);
        setAlertText("An unknown error occurred.");
        setShowAlert(true);
        break;
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
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
              className: shrink ? undefined : styles.LabelNotShrink,
            }}
            InputProps={{
              ...params.InputProps,
              onChange: handleChange,
              startAdornment: <NearMeIcon className={styles.Icon} />,
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
  }, [loading, locationOptions, shrink, styles.Icon, styles.LabelNotShrink]);

  const handleBlur = (e: any) => {
    if (e.target.value.length === 0) {
      setShrink(false);
    }
  };

  let timer: ReturnType<typeof setTimeout>;

  if (autoLocationLoading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={styles.Container}
      >
        <CircularLoading text="Detecting your location..." />
      </Grid>
    );
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={styles.Container}
      >
        <Grid item className={styles.Form}>
          {autoCompleteJSX}
        </Grid>
      </Grid>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="error">
          {alertText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
