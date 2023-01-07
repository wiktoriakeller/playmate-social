import styled from "@emotion/styled";

export const StyledSmallUserAvatar = styled.div`
  display: none;
  margin-left: 8px;

  .MuiAvatar-root {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 1000px) {
    display: flex;
  }

  @media (max-width: 450px) {
    margin-left: 3px;

    .MuiAvatar-root {
      width: 24px;
      height: 24px;
    }
  }
`;
