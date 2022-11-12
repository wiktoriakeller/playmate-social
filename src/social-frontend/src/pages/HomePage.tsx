import { useAppSelector } from "../app/hooks";
import { selectCurrentTab, TabName } from "../slices/tabSlice";
import ChatTab from "../components/tabs/ChatTab";
import GamesTab from "../components/tabs/GamesTab";
import UserSearchTab from "../components/tabs/UserSearchTab";

const HomePage = () => {
  const currentTab = useAppSelector(selectCurrentTab);

  const getCurrentTabComponent = () => {
    switch (currentTab.name) {
      case TabName.Chat:
        return <ChatTab />;
      case TabName.Games:
        return <GamesTab />;
      case TabName.Users:
        return <UserSearchTab />;
      default:
        return <></>;
    }
  };

  return getCurrentTabComponent();
};

export default HomePage;
