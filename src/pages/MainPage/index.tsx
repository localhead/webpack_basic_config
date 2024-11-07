import React, { FC, memo } from "react";

import { StyledMainPage } from "./styles";

export interface MainPageProps {
  className?: string;
  style?: React.CSSProperties;
}

const _MainPage: FC<MainPageProps> = (props) => {
  const { ...restProps } = props;

  return <StyledMainPage {...restProps}>Hello</StyledMainPage>;
};

export const MainPage = memo(_MainPage);
