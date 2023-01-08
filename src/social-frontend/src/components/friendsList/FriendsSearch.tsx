import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Typography, useMediaQuery } from "@mui/material";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import {
  selectFriendsListSearchPhrase,
  setFriendsListSearchPhrase
} from "../../slices/friendsListSlice";
import { selectWindowSizeState } from "../../slices/windowSizeSlice";
import { StyledTextField } from "../../styled/components/common/StyledTextField";
import { StyledFriendsSearch } from "../../styled/components/friends/StyledFriendsSearch";

const FriendsSearch = () => {
  const dispatch = useAppDispatch();
  const storedSearchPhrase = useAppSelector(selectFriendsListSearchPhrase);
  const windowSize = useAppSelector(selectWindowSizeState);
  const [searchPhrase, setSearchPhrase] = useState(storedSearchPhrase);
  const deviceWithPointer = useMediaQuery(
    "only screen and (hover: none) and (pointer: coarse)"
  );

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
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          paddingLeft: "4px",
          display:
            windowSize.matchesSmallWidth || deviceWithPointer ? "none" : "flex"
        }}
      >
        Friends
      </Typography>
      <StyledTextField
        value={searchPhrase}
        size="small"
        placeholder={"Search"}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
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
