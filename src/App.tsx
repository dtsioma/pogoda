import Header from "./components/header/Header";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { themeConfig } from "./utils/themeConfig";
import Routes from "./components/general/Routes";

const App = () => {
  const theme = createTheme(themeConfig);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Routes />
      </ThemeProvider>
    </div>
  );
};

export default App;
