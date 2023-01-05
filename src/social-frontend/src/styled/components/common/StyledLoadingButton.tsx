import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";

export interface IStyledLoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

export const StyledLoadingButton = styled(Button)<IStyledLoadingButtonProps>`
  &.MuiButton-root {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 8px;

    .MuiCircularProgress-root {
      display: ${(props) => (props.isLoading ? "flex" : "none")};
      color: ${(props) =>
        props.disabled
          ? props.theme.palette.primary.main
          : props.theme.palette.secondary.main};
      width: 16px !important;
      height: 16px !important;
    }
  }
`;
