import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/storeHooks";
import ChatTab from "../components/tabs/ChatTab";
import GamesTab from "../components/tabs/GamesTab";
import UsersSearchTab from "../components/tabs/UsersSearchTab";
import { selectCurrentTab, TabName } from "../slices/tabSlice";
import { selectUserIdentity } from "../slices/userIdentitySlice";

const HomePage = () => {
  const user = useAppSelector(selectUserIdentity);
  const currentTab = useAppSelector(selectCurrentTab);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user === undefined || user?.jwtToken === null) {
      navigate("/login");
    }
  }, [user]);

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
