import Header from "./components/header/Header";
import {
  createTheme,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import { themeConfig } from "./utils/theme-config";
import Routes from "./components/general/Routes";
import "./App.css";

const App = () => {
  const theme = createTheme(themeConfig);
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Header />
          <Routes />
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
};

export default App;
