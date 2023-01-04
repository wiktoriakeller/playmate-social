import { Typography } from "@mui/material";
import { StyledLink } from "../styled/components/common/StyledLink";
import { PageNotFoundBox } from "../styled/pages/PageNotFoundBox";

export const PageNotFound = () => {
  return (
    <main>
      <PageNotFoundBox>
        <Typography variant="h1" sx={{ fontWeight: "bold" }}>
          404
        </Typography>
        <Typography variant="h3">Page not found</Typography>
        <Typography variant="h6">
          The Page you are looking for does not exist,{" "}
          <StyledLink underline="always" href="/">
            Go back
          </StyledLink>
          .
        </Typography>
      </PageNotFoundBox>
    </main>
  );
};
