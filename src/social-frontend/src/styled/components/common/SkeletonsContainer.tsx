import styled from "@emotion/styled";

export interface SkeletonsContainerProps {
  childrenHeight: number;
  flexDirection?: "row" | "column";
}

export const SkeletonsContainer = styled.div<SkeletonsContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  justify-content: flex-start;
  align-items: center;

  .MuiSkeleton-root {
    height: ${(props) => props.childrenHeight};

    &:not(.MuiSkeleton-circular) {
      align-self: flex-start;
      margin-left: 10px;
    }
  }
`;
