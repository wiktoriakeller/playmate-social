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
import { IUpdateUserResponse } from "../../api/users/responses/updateUserResponse";
import { useUpdateUserMutation } from "../../api/users/usersApi";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import { openSnackbar, SnackbarSeverity } from "../../slices/snackbarSlice";
import {
  selectUserIdentity,
  setUserIdentity
} from "../../slices/userIdentitySlice";
import { StyledDialog } from "../../styled/components/common/StyledDialog";
import { StyledFileInput } from "../../styled/components/common/StyledFileInput";

export interface IUserProfileDialogProps {
  handleCloseDialog: () => void;
  isOpen: boolean;
}

const UserProfileDialog = (props: IUserProfileDialogProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserIdentity);
  const [updateUser] = useUpdateUserMutation();
  const [username, setUsername] = useState(user.username ?? "");
  const [usernameError, setUsernameError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(
    user.profilePictureUrl
  );
  const [uploadedFile, setUploadedFile] = useState<null | File>(null);

  useEffect(() => {
    if (username.length < 2 || username.length > 20) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  }, [username]);

  const handleCloseDialog = () => {
    setTimeout(() => {
      setUsername(user.username ?? "");
      setUploadedFileUrl(user.profilePictureUrl);
      setUploadedFile(null);
    }, 100);
    props.handleCloseDialog();
  };

  const handleSaveChanges = () => {
    if (username === user.username && uploadedFile === null) {
      handleCloseDialog();
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("picture", uploadedFile);

    updateUser({
      userId: user.id,
      formData: formData
    })
      .unwrap()
      .then((response) => {
        if (!!response) {
          dispatch(
            setUserIdentity({
              ...user,
              username: response.data.username,
              profilePictureUrl: response.data.profilePictureUrl
            })
          );
          handleCloseDialog();
        }
      })
      .catch(
        (error: { status: string | number; data: IUpdateUserResponse }) => {
          dispatch(
            openSnackbar({
              message:
                error.data?.errors.length > 0
                  ? error.data.errors[0]
                  : "Provided data is invalid",
              severity: SnackbarSeverity.Error,
              status: error.status
            })
          );
        }
      );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setUploadedFileUrl(url);
    setUploadedFile(file);
  };

  return (
    <StyledDialog
      open={props.isOpen}
      onClose={handleCloseDialog}
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
          onClick={handleCloseDialog}
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
            accept="image/png, image/jpeg, image/jpg"
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
