import { Paper } from "@material-ui/core";
import Fallback from "components/Fallback";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

const PaperStyled = styled(Paper)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Layout = () => {
  return (
    <Router>
      <PaperStyled square>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path="/">
              hihi
            </Route>
          </Switch>
        </Suspense>
      </PaperStyled>
    </Router>
  );
};

export default Layout;
