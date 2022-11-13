import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Typography } from "@mui/material";
import _ from "lodash";
import React, { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setFriendsListSearchPhrase } from "../../slices/friendsListSlice";
import { StyledFriendsSearch } from "../../styled/components/friends/StyledFriendsSearch";
import { StyledTextField } from "../../styled/components/mui/StyledTextField";

const FriendsSearch = () => {
  const dispatch = useAppDispatch();

  const changeSearchPhrase = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setFriendsListSearchPhrase(event.target.value));
  };

  const debouncedChangeSearchPhrase = useCallback(
    _.debounce(changeSearchPhrase, 500),
    []
  );

  return (
    <StyledFriendsSearch>
      <Typography variant="h6" sx={{ fontWeight: "bold", paddingLeft: "4px" }}>
        Friends
      </Typography>
      <StyledTextField
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
        onChange={debouncedChangeSearchPhrase}
      />
    </StyledFriendsSearch>
  );
};

export default FriendsSearch;
