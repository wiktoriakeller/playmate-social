import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/storeHooks";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { StyledDialog } from "../../styled/components/common/StyledDialog";
import { StyledFileInput } from "../../styled/components/common/StyledFileInput";

export interface IUserProfileDialogProps {
  handleCloseDialog: () => void;
  isOpen: boolean;
}

const UserProfileDialog = (props: IUserProfileDialogProps) => {
  const user = useAppSelector(selectUserIdentity);
  const [username, setUsername] = useState(user.username ?? "");
  const [usernameError, setUsernameError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(
    user.profilePictureUrl
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUsername(user.username ?? "");
      setUploadedFileUrl(user.profilePictureUrl);
    }, 100);

    return () => clearTimeout(timeout);
  }, [props.isOpen]);

  useEffect(() => {
    if (username.length < 2 || username.length > 20) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  }, [username]);

  const handleSaveChanges = () => {
    props.handleCloseDialog();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setUploadedFileUrl(url);
  };

  return (
    <StyledDialog
      open={props.isOpen}
      onClose={props.handleCloseDialog}
      fullWidth={true}
      maxWidth="sm"
      scroll="paper"
      useDividers={true}
    >
      <DialogTitle>
        <span>User profile</span>
        <IconButton
          aria-label="close"
          size="small"
          onClick={props.handleCloseDialog}
          sx={{
            position: "absolute",
            right: 10,
            top: 15,
            color: (theme) => theme.palette.grey[400]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers={true}
        sx={{
          paddingBottom: "20px",
          paddingTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "30px",
          paddingLeft: "80px",
          paddingRight: "80px"
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Avatar
            sx={{ width: "180px", height: "180px" }}
            src={!!uploadedFileUrl ? uploadedFileUrl : ""}
          />
          <StyledFileInput
            ref={fileInputRef}
            id="profile-image-input"
            type="file"
            onChange={handleFileUpload}
            accept="image/png, image/jpeg"
          />
          <Button
            sx={{
              position: "absolute",
              marginTop: "120px",
              marginLeft: "150px"
            }}
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => fileInputRef.current.click()}
          >
            Edit
          </Button>
        </Box>
        <TextField
          size="small"
          label="Username"
          variant="outlined"
          fullWidth
          onChange={(event) => setUsername(event.target.value)}
          helperText={
            usernameError ? "Username must be 2-20 characters long" : ""
          }
          error={usernameError}
          defaultValue={username}
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          disabled={usernameError}
          onClick={handleSaveChanges}
          color="secondary"
        >
          Save changes
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default UserProfileDialog;
