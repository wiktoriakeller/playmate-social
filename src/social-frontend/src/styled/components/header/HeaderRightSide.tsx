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

  @media (max-width: 620px) {
    display: none;
    margin-right: 10px;
  }

  @media only screen and (max-width: 450px) {
    display: flex;
    margin-right: 12px;

    #theme-toggle-button {
      display: none;
    }
  }
`;
