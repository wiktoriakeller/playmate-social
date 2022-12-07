import styled from "@emotion/styled";
import {
  getScrollbarBackgroundColor,
  getScrollbarColor
} from "../scrollbar/StyledScrollbar";

export const EmojiPickerContainer = styled.div`
  padding-bottom: 10px;
  padding-right: 30px;

  .epr-body {
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
  }
`;
