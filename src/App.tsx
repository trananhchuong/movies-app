import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import NoNetWork from "components/NoNetwork";
import useNavigatorOnLine from "hooks/useNavigatorOnLine";
import Layout from "Layout";
import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const isOnline = useNavigatorOnLine();

  // Dark theme
  const darkTheme = useMemo(() => {
    return createMuiTheme({
      palette: {
        type: "dark",
      },
      overrides: {
        MuiCard: {
          root: {},
        },
      },
      typography: {
        fontFamily: "Comic Neue",
      },
    });
  }, []);

  if (!isOnline) {
    return <NoNetWork />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          <Layout />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
