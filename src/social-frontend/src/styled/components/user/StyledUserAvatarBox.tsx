import styled from "@emotion/styled";

export const StyledUserAvatarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  padding: 6px 5px;
  gap: 6px;
  margin-left: 6px;
  border: 1px solid
    ${(props) =>
      props.theme.palette.mode === "dark"
        ? props.theme.palette.grey[800]
        : props.theme.palette.grey[300]};

  :hover {
    background-color: ${(props) =>
      props.theme.palette.mode === "dark"
        ? props.theme.palette.grey[800]
        : props.theme.palette.grey[300]};
  }
`;
