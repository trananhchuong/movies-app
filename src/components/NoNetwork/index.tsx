import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as NotInternetLogo } from "assets/images/not_internet.svg";

const NoNetWorkStyled = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h2 {
    margin-bottom: 24px;
    text-align: center;
  }

  .not-internet-img {
    width: 300px;
    height: 300px;
  }
`;

NoNetWork.propTypes = {};

function NoNetWork() {
  return (
    <NoNetWorkStyled>
      <h2>
        There is a problem with the network connection, please check again
      </h2>
      <NotInternetLogo className="not-internet-img" />
    </NoNetWorkStyled>
  );
}

export default NoNetWork;
