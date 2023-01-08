import styled from "@emotion/styled";
import { Tabs } from "@mui/material";

export const StyledTabs = styled(Tabs)`
  @media only screen and (max-width: 450px) {
    &.MuiTabs-root {
      max-width: 165;
    }

    .MuiTabs-flexContainer {
      max-width: 165;
    }

    .MuiTabs-indicator {
      max-width: 55px;
    }
  }
`;
