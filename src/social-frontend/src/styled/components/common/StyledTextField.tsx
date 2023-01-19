import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import {
  getScrollbarBackgroundColor,
  getScrollbarColor
} from "../scrollbar/StyledScrollbar";

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${(props) => props.theme.palette.background.paper};
    margin-right: auto;

    textarea {
      overflow-y: scroll;
      scroll-behavior: smooth;
      scrollbar-gutter: stable;

      ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
        background-color: ${(props) =>
          getScrollbarBackgroundColor(props.theme)};
      }

      ::-webkit-scrollbar-thumb {
        background: ${(props) => getScrollbarColor(props.theme)};
      }

      ::-webkit-scrollbar-corner {
        ${(props) => getScrollbarBackgroundColor(props.theme)}
      }
    }

    #friends-search-input-adornment {
      @media only screen and (max-width: 700px) and (min-width: 451px) and (hover: hover) and (pointer: fine) {
        display: none;
      }
    }
  }
`;
