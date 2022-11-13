import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Typography } from "@mui/material";
import { StyledFriendsSearch } from "../../styled/components/friends/StyledFriendsSearch";
import { RoundTextField } from "../../styled/components/mui/RoundTextField";

const FriendsSearch = () => {
  return (
    <StyledFriendsSearch>
      <Typography variant="h6" sx={{ fontWeight: "bold", paddingLeft: "4px" }}>
        Friends
      </Typography>
      <RoundTextField
        size="small"
        placeholder={"Search"}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </StyledFriendsSearch>
  );
};

export default FriendsSearch;
