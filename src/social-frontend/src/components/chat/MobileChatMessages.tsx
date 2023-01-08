import { useMediaQuery } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/storeHooks";
import { selectSelectedFriend } from "../../slices/friendsListSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { selectWindowSizeState } from "../../slices/windowSizeSlice";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import MobileChatHeader from "./MobileChatHeader";

const MobileChatMessages = () => {
  const user = useAppSelector(selectUserIdentity);
  const windowSize = useAppSelector(selectWindowSizeState);
  const selectedFriend = useAppSelector(selectSelectedFriend);
  const deviceWithPointer = useMediaQuery(
    "only screen and (hover: none) and (pointer: coarse)"
  );

  if (!windowSize.matchesSmallWidth && !deviceWithPointer) {
    return <Navigate to="/not-found" />;
  }

  if (user.jwtToken === null || selectedFriend === null) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <MobileChatHeader />
      <ChatMessages />
      <ChatInput />
    </>
  );
};

export default MobileChatMessages;
