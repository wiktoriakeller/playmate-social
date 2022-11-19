import { List } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUserSearch } from "../../slices/userSearchSlice";
import UserSearchItem from "./UserSearchItem";

const UserSearchList = () => {
  const userList = useAppSelector(selectUserSearch);

  return (
    <List sx={{ overflow: "auto", maxHeight: "100%" }}>
      {userList.users?.map((item) => (
        <UserSearchItem {...item} key={item.id} />
      ))}
    </List>
  );
};

export default UserSearchList;
