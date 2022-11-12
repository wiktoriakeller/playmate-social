import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { StyledFriendsSearch } from "../../styled/components/friends/StyledFriendsSearch";

const FriendsSearch = () => {
  return (
    <StyledFriendsSearch>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Friends
      </Typography>
      <TextField
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
