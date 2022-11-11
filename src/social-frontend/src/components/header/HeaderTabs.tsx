import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCurrentTab, setTabIndex, TabName } from "../../slices/tabSlice";
import { StyledTab } from "../../styled/components/mui/StyledTab";

const HeaderTabs = () => {
  const currentTab = useAppSelector(selectCurrentTab);
  const disptach = useAppDispatch();

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    let tabName = TabName.Chat;
    if (newTab === 1) {
      tabName = TabName.Games;
    } else if (newTab === 2) {
      tabName = TabName.Users;
    }

    disptach(
      setTabIndex({
        index: newTab,
        name: tabName
      })
    );
  };

  return (
    <Tabs
      value={currentTab.index}
      onChange={handleTabChange}
      indicatorColor={"secondary"}
    >
      <StyledTab icon={<ChatIcon sx={{ fontSize: "32px" }} />} />
      <StyledTab icon={<VideogameAssetIcon sx={{ fontSize: "32px" }} />} />
      <StyledTab icon={<PeopleIcon sx={{ fontSize: "32px" }} />} />
    </Tabs>
  );
};

export default HeaderTabs;
