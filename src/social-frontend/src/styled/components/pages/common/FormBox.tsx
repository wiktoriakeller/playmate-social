import styled from "@emotion/styled";

export const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 45px 45px;

  @media only screen and (max-width: 450px) {
    padding: 35px 25px;
  }

  @media only screen and (max-width: 380px) {
    padding: 30px 20px;
  }
`;
