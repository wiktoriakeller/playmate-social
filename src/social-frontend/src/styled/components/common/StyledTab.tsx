import styled from "@emotion/styled";
import Tab from "@mui/material/Tab";

export const StyledTab = styled(Tab)`
  &.Mui-selected {
    color: ${(props) => props.theme.palette.secondary.main};
  }

  .MuiSvgIcon-root {
    font-size: 31px;
  }

  @media (max-width: 450px) {
    &.MuiButtonBase-root {
      min-width: 55px;
    }

    .MuiSvgIcon-root {
      font-size: 25px;
      margin-top: 6px;
    }
  }
`;
