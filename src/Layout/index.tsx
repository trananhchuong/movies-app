import { Paper } from "@material-ui/core";
import AppHeader from "components/AppHeader";
import Fallback from "components/Fallback";
import ScrollToTop from "components/ScrollToTop";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./index.module.css";


const Home = lazy(() => import("pages/Home"));
const MovieDetails = lazy(() => import("pages/MovieDetails"));

const Layout = () => {
  return (
    <Router>
      <Paper square className={styles.root}>
        <ScrollToTop />
        <AppHeader />
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/:movieId">
              <MovieDetails />
            </Route>
          </Switch>
        </Suspense>
      </Paper>
    </Router>
  );
};

export default Layout;
