import styled from "@emotion/styled";

export const FormContainer = styled.div`
  margin-top: 70px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
  width: 480px;

  @media (max-width: 600px) {
    width: 440px;
  }

  @media (max-width: 450px) {
    margin-top: 20%;
    width: 370px;
  }

  @media (max-width: 380px) {
    width: 340px;
  }
`;
