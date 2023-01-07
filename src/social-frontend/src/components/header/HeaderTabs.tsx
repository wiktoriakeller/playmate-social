import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import {
  selectCurrentTab,
  setCurrentTab,
  tabsDictionary
} from "../../slices/tabSlice";
import { StyledTab } from "../../styled/components/common/StyledTab";
import { StyledTabs } from "../../styled/components/common/StyledTabs";

const HeaderTabs = () => {
  const currentTab = useAppSelector(selectCurrentTab);
  const disptach = useAppDispatch();

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabIndex: number
  ) => {
    const newTab = tabsDictionary.find((x) => x.index === newTabIndex);

    disptach(
      setCurrentTab({
        index: newTab.index,
        name: newTab.name
      })
    );
  };

  return (
    <StyledTabs
      value={currentTab.index}
      onChange={handleTabChange}
      indicatorColor={"secondary"}
    >
      <StyledTab icon={<ChatIcon />} />
      <StyledTab icon={<VideogameAssetIcon />} />
      <StyledTab icon={<PeopleIcon />} />
    </StyledTabs>
  );
};

export default HeaderTabs;
