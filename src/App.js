import { Header } from "./components/header/Header";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { themeConfig } from "./utils/themeConfig";

function App() {
  const theme = createTheme(themeConfig);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </div>
  );
}

export default App;
