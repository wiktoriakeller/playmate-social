import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export interface IUserProfileDialogProps {
  handleCloseDialog: () => void;
  isOpen: boolean;
}

const UserProfileDialog = (props: IUserProfileDialogProps) => {
  return (
    <Dialog open={props.isOpen} onClose={props.handleCloseDialog}>
      <DialogTitle sx={{ paddingBottom: "0px" }}>Your profile</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
