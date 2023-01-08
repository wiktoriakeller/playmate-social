import styled from "@emotion/styled";

export const HeaderLeftSide = styled.div`
  justify-self: flex-start;
  margin-left: 30px;

  @media (max-width: 620px) {
    display: none;
    margin-left: 0px;
  }

  @media (max-width: 450px) {
    display: flex;
  }
`;
