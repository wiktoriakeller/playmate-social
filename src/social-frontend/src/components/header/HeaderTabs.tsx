import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import {
  selectCurrentTab,
  setCurrentTab,
  TabName,
  tabsDictionary
} from "../../slices/tabSlice";
import { StyledTab } from "../../styled/components/common/StyledTab";

const HeaderTabs = () => {
  const currentTab = useAppSelector(selectCurrentTab);
  const disptach = useAppDispatch();

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabIndex: number
  ) => {
    let newTabName = TabName.Chat;
    for (const tab of tabsDictionary) {
      if (tab.index === newTabIndex) {
        newTabName = tab.name;
        break;
      }
    }

    disptach(
      setCurrentTab({
        index: newTabIndex,
        name: newTabName
      })
    );
  };

  return (
    <Tabs
      value={currentTab.index}
      onChange={handleTabChange}
      indicatorColor={"secondary"}
    >
      <StyledTab icon={<ChatIcon sx={{ fontSize: "31px" }} />} />
      <StyledTab icon={<VideogameAssetIcon sx={{ fontSize: "31px" }} />} />
      <StyledTab icon={<PeopleIcon sx={{ fontSize: "31px" }} />} />
    </Tabs>
  );
};

export default HeaderTabs;
