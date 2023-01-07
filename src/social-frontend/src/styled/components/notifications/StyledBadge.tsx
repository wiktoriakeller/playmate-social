import styled from "@emotion/styled";
import { Badge } from "@mui/material";

export const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    right: 3px;
    top: 5px;
    padding: 0px 4px;
  }

  .MuiSvgIcon-root {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 450px) {
    .MuiSvgIcon-root {
      width: 24px;
      height: 24px;
    }

    .MuiBadge-badge {
      min-width: 16px;
      height: 16px;
      border-radius: 50%;
      right: 5px;
    }
  }
`;
