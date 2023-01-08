import styled from "@emotion/styled";

export const StyledSmallUserAvatar = styled.div`
  display: none;

  .MuiAvatar-root {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 1000px) {
    display: flex;
  }

  @media only screen and (max-width: 450px) {
    margin-left: 12px;

    .MuiAvatar-root {
      width: 27px;
      height: 27px;
    }
  }
`;
