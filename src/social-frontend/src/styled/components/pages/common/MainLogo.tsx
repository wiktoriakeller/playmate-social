import styled from "@emotion/styled";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

export const MainLogo = styled(SportsEsportsIcon)`
  &.MuiSvgIcon-root {
    font-size: 65px;
    color: ${(props) => props.theme.palette.secondary.main};

    :hover {
      color: ${(props) => props.theme.palette.secondary.light};
    }
  }

  @media only screen and (max-width: 450px) {
    &.MuiSvgIcon-root {
      font-size: 55px;
    }
  }

  @media only screen and (max-width: 380px) {
    &.MuiSvgIcon-root {
      font-size: 52px;
    }
  }
`;
