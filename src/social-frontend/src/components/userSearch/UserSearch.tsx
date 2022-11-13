import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLazySearchUsersQuery } from "../../api/users/usersApi";
import { useAppDispatch } from "../../app/hooks";
import { setUserSearch } from "../../slices/userSearchSlice";
import { StyledUserSearch } from "../../styled/components/userSearch/StyledUserSearch";

const UserSearch = () => {
  const [searchQuery, { data, isLoading }] = useLazySearchUsersQuery();
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!!username && !isLoading) {
        searchQuery({
          username: username
        }).then((e) => {
          dispatch(setUserSearch(e.data.data.users));
        })
      }
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [username]);

  return (
    <StyledUserSearch>
      <TextField
        placeholder="Search"
        variant="outlined"
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </StyledUserSearch>
  );
};

export default UserSearch;
