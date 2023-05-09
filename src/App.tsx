import React from "react";
import { Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import NotFound from "./routes/NotFound";

function App() {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={true} />
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path=":coinId" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
