import React from "react";
import UserSearch from "../../components/userSearch/UserSearch";
import UserSearchList from "../../components/userSearch/UserSearchList";
import { CenteredListContainer } from "../../styled/components/CenteredListContainer";

const UserSearchTab = () => {
  return (
    <CenteredListContainer>
      <UserSearch />
      <UserSearchList />
    </CenteredListContainer>
  );
};

export default UserSearchTab;
