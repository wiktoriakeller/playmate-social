import styled from "@emotion/styled";
import { DialogContent } from "@mui/material";
import {
  getScrollbarBackgroundColor,
  getScrollbarColor
} from "../scrollbar/StyledScrollbar";

export const StyledDialogContent = styled(DialogContent)`
  &.MuiDialogContent-root {
    overflow-y: auto;
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
  }
`;
