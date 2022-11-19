import React from "react";
import UserSearch from "../../components/userSearch/UserSearch";
import UserSearchList from "../../components/userSearch/UserSearchList";
import { UserSearchContainer } from "../../styled/components/userSearch/UserSearchContainer";

const UserSearchTab = () => {
  return (
    <UserSearchContainer>
      <UserSearch />
      <UserSearchList />
    </UserSearchContainer>
  );
};

export default UserSearchTab;
