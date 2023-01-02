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
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/storeHooks";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { StyledDialog } from "../../styled/components/common/StyledDialog";

export interface IUserProfileDialogProps {
  handleCloseDialog: () => void;
  isOpen: boolean;
}

const UserProfileDialog = (props: IUserProfileDialogProps) => {
  const user = useAppSelector(selectUserIdentity);
  const [username, setUsername] = useState(user.username ?? "");
  const [usernameError, setUsernameError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUsername(user.username ?? "");
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
          <Avatar sx={{ width: "180px", height: "180px" }} />
          <Button
            sx={{
              position: "absolute",
              marginTop: "120px",
              marginLeft: "150px"
            }}
            variant="contained"
            size="small"
            color="secondary"
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
