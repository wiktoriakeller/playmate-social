import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/storeHooks";
import { selectSelectedFriend } from "../../slices/friendsListSlice";
import { StyledMobileChatHeader } from "../../styled/components/chat/StyledMobileChatHeader";

const MobileChatHeader = () => {
  const navigate = useNavigate();
  const selectedUser = useAppSelector(selectSelectedFriend);

  return (
    <StyledMobileChatHeader>
      <IconButton
        disableRipple
        sx={{ paddingRight: "0px" }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon fontSize="medium" />
      </IconButton>
      <Avatar src={selectedUser.profilePictureUrl ?? ""} />
      <span>{selectedUser?.username}</span>
    </StyledMobileChatHeader>
  );
};

export default MobileChatHeader;
