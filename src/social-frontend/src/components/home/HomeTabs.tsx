import { useAppSelector } from "../../app/hooks";
import { selectCurrentTab } from "../../slices/tabSlice";

const HomeTabs = () => {
  const currentTab = useAppSelector(selectCurrentTab);
  return <div>{currentTab.name}</div>;
};

export default HomeTabs;
