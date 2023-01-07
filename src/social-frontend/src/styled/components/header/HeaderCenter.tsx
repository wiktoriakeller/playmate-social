import styled from "@emotion/styled";

export const HeaderCenter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 450px) {
    margin-right: 7%;
  }

  @media (max-width: 400px) {
    margin-right: 4%;
  }
`;
