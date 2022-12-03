import { List } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectUserSearch } from "../../slices/userSearchSlice";
import UsersSearchItem from "./UsersSearchItem";

const UsersSearchList = () => {
  const userList = useAppSelector(selectUserSearch);

  return (
    <List sx={{ overflow: "auto", maxHeight: "100%" }}>
      {userList.users?.map((item) => (
        <UsersSearchItem {...item} key={item.id} />
      ))}
    </List>
  );
};

export default UsersSearchList;
