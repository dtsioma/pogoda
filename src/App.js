import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { themeConfig } from "./utils/themeConfig";
import "./App.css";

function App() {
  const theme = createTheme(themeConfig);
  return (
    <ThemeProvider theme={theme}>
      <div className="App"></div>
    </ThemeProvider>
  );
}

export default App;
