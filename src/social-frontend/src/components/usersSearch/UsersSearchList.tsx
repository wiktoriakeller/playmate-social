import { useAppSelector } from "../../app/hooks";
import { selectUserSearch } from "../../slices/userSearchSlice";
import { UsersList } from "../../styled/components/userSearch/UsersList";
import UsersSearchItem from "./UsersSearchItem";

const UsersSearchList = () => {
  const userList = useAppSelector(selectUserSearch);

  return (
    <UsersList>
      {userList.users?.map((item) => (
        <UsersSearchItem {...item} key={item.id} />
      ))}
    </UsersList>
  );
};

export default UsersSearchList;
