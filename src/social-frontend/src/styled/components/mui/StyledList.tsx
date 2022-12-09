import styled from "@emotion/styled";
import { List } from "@mui/material";
import {
  getScrollbarBackgroundColor,
  getScrollbarColor
} from "../scrollbar/StyledScrollbar";

export const StyledList = styled(List)`
  overflow-x: hidden;
  max-height: 200px;
  overflow-y: scroll;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    background-color: ${(props) => getScrollbarBackgroundColor(props.theme)};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => getScrollbarColor(props.theme)};
  }

  ::-webkit-scrollbar-corner {
    ${(props) => getScrollbarBackgroundColor(props.theme)}
  }
`;
