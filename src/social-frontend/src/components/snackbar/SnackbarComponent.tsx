import { Alert, Snackbar } from "@mui/material";
import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
    []
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
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarComponent;
