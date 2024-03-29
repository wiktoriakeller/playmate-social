import styled from "@emotion/styled";

export const StyledHeader = styled.nav`
  top: 0;
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  position: sticky;
  margin-bottom: auto;
  background-color: ${(props) => props.theme.palette.header};
  border-bottom: 1px solid ${(props) => props.theme.palette.border};
  z-index: 2;
  box-sizing: border-box;
`;
