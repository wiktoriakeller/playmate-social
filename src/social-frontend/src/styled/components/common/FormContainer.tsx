import styled from "@emotion/styled";

export const FormContainer = styled.div`
  margin: 0;
  position: absolute;
  top: calc(50% - 56px);
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 480px;

  @media (max-width: 600px) {
    width: 440px;
  }
`;
