import styled from "@emotion/styled";

export const StyledFriendsSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 4px;
  margin: 12px 0px 20px 0px;
  padding: 0px 10px;
  height: 60px;
  box-sizing: border-box;

  @media only screen and (max-width: 450px),
    (hover: none) and (pointer: coarse) {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;
