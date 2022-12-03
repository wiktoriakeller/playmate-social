import { UserSearchContainer } from "../../styled/components/userSearch/UserSearchContainer";
import UsersSearch from "../usersSearch/UsersSearch";
import UsersSearchList from "../usersSearch/UsersSearchList";

const UsersSearchTab = () => {
  return (
    <UserSearchContainer>
      <UsersSearch />
      <UsersSearchList />
    </UserSearchContainer>
  );
};

export default UsersSearchTab;
