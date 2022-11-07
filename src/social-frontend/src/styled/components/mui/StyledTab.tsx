import styled from "@emotion/styled";
import Tab from "@mui/material/Tab";

export const StyledTab = styled(Tab)`
  &.Mui-selected {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;
