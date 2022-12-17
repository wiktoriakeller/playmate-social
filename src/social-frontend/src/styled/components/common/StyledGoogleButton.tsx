import styled from "@emotion/styled";
import GoogleButton from "react-google-button";

export const StyledGoogleButton = styled(GoogleButton)`
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: flex-start !important;
  width: 100% !important;
  box-shadow: none !important;
  border: 1px solid ${(props) => props.theme.palette.border} !important;
  transition: all 0s ease 0s !important;

  :hover {
    box-shadow: none !important;
    background-color: ${(props) =>
      props.theme.palette.mode === "dark"
        ? props.theme.palette.background.paper
        : props.theme.palette.primary.light} !important;
    transition: all 0s ease 0s !important;

    div {
      transition: all 0s ease 0s !important;
      background-color: inherit !important;
    }
  }

  div {
    margin: 0px !important;
  }

  span {
    margin-left: auto !important;
    margin-right: auto !important;
    text-overflow: ellipsis !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    color: ${(props) =>
      props.theme.palette.mode === "dark"
        ? props.theme.palette.text.primary
        : props.theme.palette.text.secondary} !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    overflow: hidden !important;
  }
`;
