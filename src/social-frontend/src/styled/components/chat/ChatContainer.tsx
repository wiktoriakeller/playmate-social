import styled from "@emotion/styled";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: calc(100vw - 320px);
  height: 100%;

  @media only screen and (max-width: 700px) {
    width: calc(100vw - 95px);
  }

  @media only screen and (max-width: 450px),
    (hover: none) and (pointer: coarse) {
    display: none;
  }
`;
