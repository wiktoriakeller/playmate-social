import styled from "@emotion/styled";
import {
  getScrollbarBackgroundColor,
  getScrollbarColor
} from "../scrollbar/StyledScrollbar";

export const EmojiPickerContainer = styled.div`
  padding-bottom: 10px;
  padding-right: 8px;

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

  @media only screen and (max-width: 450px),
    (hover: none) and (pointer: coarse) {
    .EmojiPickerReact {
      max-width: 280px !important;
      max-height: 340px !important;
    }

    .Flex.epr-preview.FlexRow {
      display: none;
    }

    .epr-emoji-category-label {
      display: none !important;
    }

    .Flex.epr-header-overlay.FlexRow {
      padding-bottom: 5px;
    }

    .epr-category-nav {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
`;
