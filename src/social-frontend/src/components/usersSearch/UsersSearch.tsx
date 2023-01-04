import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { useLazySearchUsersQuery } from "../../api/users/usersApi";
import { useAppDispatch } from "../../app/storeHooks";
import { openSnackbar, SnackbarSeverity } from "../../slices/snackbarSlice";
import { setUserSearch } from "../../slices/userSearchSlice";
import { StyledUserSearch } from "../../styled/components/userSearch/StyledUserSearch";

const UsersSearch = () => {
  const [searchQuery, { isLoading }] = useLazySearchUsersQuery();
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!!username && !isLoading) {
        searchQuery({
          username: username
        })
          .unwrap()
          .then((response) => {
            dispatch(setUserSearch(response?.data?.users));
          })
          .catch((error: { status: string | number }) => {
            dispatch(
              openSnackbar({
                message: "Could not load users list",
                severity: SnackbarSeverity.Error,
                status: error.status
              })
            );
          });
      }
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [username, dispatch, isLoading, searchQuery]);

  return (
    <StyledUserSearch
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
  );
};

export default UsersSearch;
