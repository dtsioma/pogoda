import {
  Theme,
  AppBar,
  Toolbar,
  makeStyles,
  Link as MaterialLink,
} from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: "Zen Tokyo Zoo",
    fontSize: "30px",
    textTransform: "uppercase",
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
  },
  link: {
    color: theme.palette.primary.contrastText,
    marginLeft: "auto",
  },
  back: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    marginLeft: "4em",
    padding: "5px",
  },
  icon: {
    marginRight: "5px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <AppBar>
      <Toolbar>
        <RouterLink to="/" className={classes.title}>
          pogoda
        </RouterLink>
        {pathname !== "/" ? (
          <RouterLink to="/" className={classes.back}>
            <KeyboardBackspaceIcon className={classes.icon} /> back
          </RouterLink>
        ) : null}
        <MaterialLink
          href={process.env.REACT_APP_GITHUB_LINK!}
          className={classes.link}
          target="_blank"
        >
          <GitHubIcon />
        </MaterialLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
