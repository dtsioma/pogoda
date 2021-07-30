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
import styles from "./Header.module.css";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <AppBar>
      <Toolbar>
        <RouterLink to="/" className={styles.Title}>
          pogoda
        </RouterLink>
        {pathname !== "/" ? (
          <RouterLink to="/" className={styles.Back}>
            <KeyboardBackspaceIcon className={styles.Icon} /> back
          </RouterLink>
        ) : null}
        <MaterialLink
          href={process.env.REACT_APP_GITHUB_LINK!}
          className={styles.Link}
          target="_blank"
        >
          <GitHubIcon />
        </MaterialLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
