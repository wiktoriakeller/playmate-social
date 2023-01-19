import styled from "@emotion/styled";

export const StyledChatInput = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 2px;
  padding-left: 12px;
  box-sizing: border-box;

  @media only screen and (max-width: 450px),
    (hover: none) and (pointer: coarse) {
    bottom: 0;
    position: sticky;
  }
`;
