import React from "react";

import { MainPage } from "@pages/MainPage";
import { GlobalStyle } from "@pages/utils/globalStyle";

export const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <MainPage />
    </div>
  );
};
