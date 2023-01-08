import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const getScrollbarBackgroundColor = (theme: Theme): string => {
  if (theme.palette.mode === "dark") {
    return theme.palette.grey[800];
  }

  return theme.palette.grey[200];
};

export const getScrollbarColor = (theme: Theme): string => {
  if (theme.palette.mode === "dark") {
    return theme.palette.grey[600];
  }

  return theme.palette.grey[400];
};

export const StyledScrollbar = styled.div`
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-gutter: stable;

  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    background-color: ${(props) => getScrollbarBackgroundColor(props.theme)};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => getScrollbarColor(props.theme)};
  }

  ::-webkit-scrollbar-corner {
    background-color: ${(props) => getScrollbarBackgroundColor(props.theme)};
  }
`;
