import styled from "@emotion/styled";

export const FormTitle = styled.div`
  font-size: 28px;
  color: ${(props) =>
    props.theme.palette.mode === "dark"
      ? props.theme.palette.grey[300]
      : props.theme.palette.text.secondary};

  @media (max-width: 450px) {
    font-size: 24px;
  }

  @media (max-width: 380px) {
    font-size: 23px;
  }
`;
