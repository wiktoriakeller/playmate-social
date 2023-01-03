import styled from "@emotion/styled";
import { Dialog, DialogProps, Theme } from "@mui/material";

export interface IStyledDialogProps extends DialogProps {
  useDividers?: boolean;
}

const getBorderColor = (theme: Theme, useDividers?: boolean) => {
  if (!!useDividers) {
    if (theme.palette.mode === "dark") {
      return `1px solid #383838`;
    }

    return `1px solid ${theme.palette.divider}`;
  }

  return "0px";
};

export const StyledDialog = styled(Dialog)<IStyledDialogProps>`
  .MuiPaper-root {
    background-color: ${(props) =>
      props.theme.palette.mode === "dark"
        ? props.theme.palette.common.black
        : props.theme.palette.background.paper};

    .MuiDialogContent-root {
      border-bottom: ${(props) =>
        getBorderColor(props.theme, props.useDividers)};
      border-top: ${(props) => getBorderColor(props.theme, props.useDividers)};
    }
  }
`;
