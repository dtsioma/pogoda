import { Theme, AppBar, Toolbar, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: "Zen Tokyo Zoo",
    fontSize: "30px",
    textTransform: "uppercase",
    flexGrow: 1,
  },
  button: {
    color: theme.palette.primary.contrastText,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <span className={classes.title}>pogoda</span>
        <Button
          href={process.env.REACT_APP_GITHUB_LINK!}
          className={classes.button}
          target="_blank"
        >
          Github
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
