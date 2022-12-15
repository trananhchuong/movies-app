import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Layout from "Layout";
import { useMemo } from "react";
import "./App.css";

function App() {
  // Dark theme
  const darkTheme = useMemo(() => {
    return createMuiTheme({
      palette: {
        type: "dark",
      },
      overrides: {
        MuiCard: {
          root: {
            // boxShadow: "2px 2px 2px 0px rgba(255,255,255, 0.5)",
          },
        },
      },
      typography: {
        fontFamily: "Comic Neue",
      },
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Layout />
      </div>
    </ThemeProvider>
  );
}

export default App;
