import { Alert, Snackbar } from "@mui/material";
import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import { closeSnackbar, selectSnackbarState } from "../../slices/snackbarSlice";

const SnackbarComponent = () => {
  const dispatch = useAppDispatch();
  const snackbarState = useAppSelector(selectSnackbarState);

  const handleSnackbarClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }

      dispatch(closeSnackbar());
    },
    [dispatch]
  );

  return (
    <div>
      <Snackbar
        open={snackbarState.isOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity}
          variant="filled"
          sx={{
            width: "100%",
            "&.MuiAlert-filledSuccess": {
              backgroundColor: (theme) => theme.palette.success.main,
              color: (theme) => theme.palette.common.white
            },
            "&.MuiAlert-filledWarning": {
              backgroundColor: (theme) => theme.palette.warning.main,
              color: (theme) => theme.palette.common.white
            }
          }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarComponent;
