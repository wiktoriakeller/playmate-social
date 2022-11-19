import styled from "@emotion/styled";

export interface IHeaderRightSideProps {
  isHomePage: boolean;
}

export const HeaderRightSide = styled.div<IHeaderRightSideProps>`
  margin-right: 30px;
  justify-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1px;

  @media (max-width: 620px) {
    display: ${(props) => (props.isHomePage ? "none" : "inherit")};
    margin-left: 0px;
  }
`;
