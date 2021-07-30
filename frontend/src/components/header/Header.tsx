import { Theme, AppBar, Toolbar, makeStyles, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: "Zen Tokyo Zoo",
    fontSize: "30px",
    textTransform: "uppercase",
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    flexGrow: 1,
  },
  link: {
    color: theme.palette.primary.contrastText,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <RouterLink to="/" className={classes.title}>
          pogoda
        </RouterLink>
        <Link
          href={process.env.REACT_APP_GITHUB_LINK!}
          className={classes.link}
          target="_blank"
        >
          <GitHubIcon />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
