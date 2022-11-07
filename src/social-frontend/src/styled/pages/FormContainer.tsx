import styled from "@emotion/styled";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 30px;
  margin: 100px 20%;
  border: 1px solid ${(props) => props.theme.palette.border};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  background-color: ${(props) => props.theme.palette.background.paper};
`;
