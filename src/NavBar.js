import React from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import colors from "./colors";

const spin = keyframes`
  to {
    transform: rotate(360deg)
  }
`;

const NavBar = () => (
  <header
    css={css`
      background-color: ${colors.dark};
      position: sticky;
      top: 0;
      z-index: 10;
    `}
  >
    <Link to="/">Adopt Me!</Link>
    <span
      aria-label="logo"
      role="img"
      css={css`
        &:hover {
          text-decoration: underline;
          display: inline-block;
          animation: 1s ${spin} linear infinite;
          font-size: 60px;
        }
      `}
    >
      🐩
    </span>
  </header>
);

export default NavBar;
