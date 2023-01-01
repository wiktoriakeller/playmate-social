import { useAppSelector } from "../app/storeHooks";
import ChatTab from "../components/tabs/ChatTab";
import GamesTab from "../components/tabs/GamesTab";
import UsersSearchTab from "../components/tabs/UsersSearchTab";
import { selectCurrentTab, TabName } from "../slices/tabSlice";

const HomePage = () => {
  const currentTab = useAppSelector(selectCurrentTab);

  const getCurrentTabComponent = () => {
    switch (currentTab.name) {
      case TabName.Chat:
        return <ChatTab />;
      case TabName.Games:
        return <GamesTab />;
      case TabName.Users:
        return <UsersSearchTab />;
      default:
        return <></>;
    }
  };

  return getCurrentTabComponent();
};

export default HomePage;
