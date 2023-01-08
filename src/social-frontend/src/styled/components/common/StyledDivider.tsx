import styled from "@emotion/styled";
import { Divider } from "@mui/material";

export const StyledHorizontalDivider = styled(Divider)`
  &.MuiDivider-middle {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1px;
  }

  &.MuiDivider-vertical {
    width: 2px;
  }

  .MuiDivider-wrapper {
    padding-top: 4px;
  }

  @media only screen and (max-width: 450px),
    (hover: none) and (pointer: coarse) {
    display: none;
  }
`;
