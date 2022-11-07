import styled from "@emotion/styled";

export const StyledHeader = styled.div`
  top: 0;
  height: 60px;
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  align-self: flex-start;
  flex-wrap: wrap;
  position: sticky;
  margin-bottom: auto;
  background-color: ${(props) => props.theme.palette.header};
  border-bottom: 1px solid ${(props) => props.theme.palette.border};
  z-index: 2;
`;
