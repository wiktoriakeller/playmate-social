import styled from "@emotion/styled";

export const FriendsContainer = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 315px;
  height: 100%;
  box-sizing: border-box;

  @media only screen and (max-width: 700px) and (min-width: 451px) and (hover: hover) and (pointer: fine) {
    width: 90px;
  }

  @media only screen and (max-width: 450px),
    (hover: none) and (pointer: coarse) {
    width: 100%;
  }
`;
