import CircularProgress from "@material-ui/core/CircularProgress";
import { ReactElement } from "react";

import styled from "styled-components";

const FallbackStyled = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Fallback = (): ReactElement => {
  return (
    <FallbackStyled>
      <CircularProgress />
    </FallbackStyled>
  );
};

export default Fallback;
