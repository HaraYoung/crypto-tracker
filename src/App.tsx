import React from "react";
import { Routes, Route } from "react-router-dom";
import Reset from "styled-reset";
import styled from "styled-components";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./Themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";

import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import NotFound from "./component/NotFound";
import { darkThemeState } from "./atom";

const GlobalStyle = createGlobalStyle` 
  ${Reset}
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
  body{
    font-family: 'Montserrat', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  *{
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
    color: initial;
  }
`;

const ThemeBtn = styled.button<{ darkThemeState: string }>`
  border: none;
  position: fixed;
  z-index: 9999;
  left: 3%;
  bottom: 3%;
  padding: ${(props) =>
    props.darkThemeState === "true" ? "1em" : "1em 1.2em"};
  border-radius: 50px;
  color: ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.theme.textColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  cursor: pointer;
  &:hover {
    box-shadow: ${(props) => props.theme.hoverBoxShadow};
  }
`;

function App() {
  const isDark = useRecoilValue(darkThemeState);
  const setIsDark = useSetRecoilState(darkThemeState);
  return (
    <div>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <ThemeBtn
          onClick={() => setIsDark((curr) => !curr)}
          darkThemeState={isDark.toString()}
        >
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} size="2x" />
        </ThemeBtn>
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}`} element={<Coins />} />
          <Route path=":coinId" element={<Coin />}>
            <Route path="chart" element={<Chart />} />
            <Route path="price" element={<Price />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
