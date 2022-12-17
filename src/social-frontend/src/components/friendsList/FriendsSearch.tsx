import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Typography } from "@mui/material";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectFriendsListSearchPhrase,
  setFriendsListSearchPhrase
} from "../../slices/friendsListSlice";
import { StyledFriendsSearch } from "../../styled/components/friends/StyledFriendsSearch";
import { StyledTextField } from "../../styled/components/common/StyledTextField";

const FriendsSearch = () => {
  const dispatch = useAppDispatch();
  const storedSearchPhrase = useAppSelector(selectFriendsListSearchPhrase);
  const [searchPhrase, setSearchPhrase] = useState(storedSearchPhrase);

  const debouncedChangeSearchPhrase = useMemo(
    () => (newSerchPhrase: string) =>
      _.debounce(
        () => dispatch(setFriendsListSearchPhrase(newSerchPhrase)),
        500
      ),
    [dispatch]
  );

  const handleSearchPhraseChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newPhrase = event.target.value;
      setSearchPhrase(newPhrase);
      debouncedChangeSearchPhrase(newPhrase)();
    },
    [debouncedChangeSearchPhrase]
  );

  return (
    <StyledFriendsSearch>
      <Typography variant="h6" sx={{ fontWeight: "bold", paddingLeft: "4px" }}>
        Friends
      </Typography>
      <StyledTextField
        value={searchPhrase}
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
        onChange={handleSearchPhraseChange}
      />
    </StyledFriendsSearch>
  );
};

export default FriendsSearch;
