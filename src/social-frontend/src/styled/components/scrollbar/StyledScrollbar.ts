import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const getScrollbarBackgroundColor = (theme: Theme): string => {
  if (theme.palette.mode === "dark") {
    return theme.palette.grey[600];
  }

  return theme.palette.grey[200];
};

export const getScrollbarColor = (theme: Theme): string => {
  if (theme.palette.mode === "dark") {
    return theme.palette.grey[800];
  }

  return theme.palette.grey[300];
};

export const StyledScrollbar = styled.div`
  overflow-y: scroll;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    height: 12px;
    width: 12px;
    background-color: ${(props) => getScrollbarBackgroundColor(props.theme)};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => getScrollbarColor(props.theme)};
  }

  ::-webkit-scrollbar-corner {
    ${(props) => getScrollbarBackgroundColor(props.theme)}
  }
`;
