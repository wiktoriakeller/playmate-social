import styled from "@emotion/styled";

export const StyledChatHeader = styled.div`
  box-sizing: border-box;
  align-self: flex-start;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 56px;
  padding-left: 20px;
  gap: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    font-weight: bold;
  }
`;
