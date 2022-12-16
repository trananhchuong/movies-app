import { Paper } from "@material-ui/core";
import AppHeader from "components/AppHeader";
import Fallback from "components/Fallback";
import ScrollToTop from "components/ScrollToTop";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

const PaperStyled = styled(Paper)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Home = lazy(() => import("pages/Home"));

const Layout = () => {
  return (
    <Router>
      <PaperStyled square>
        <ScrollToTop />
        <AppHeader />
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Suspense>
      </PaperStyled>
    </Router>
  );
};

export default Layout;
