import {
  Badge,
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  List,
  Paper,
  Popper,
  Skeleton,
  Tooltip,
  Typography
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useLazyGetFriendRequestsQuery } from "../../api/friends/friendsApi";
import RequestItem from "./RequestItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectFriendRequests,
  setFriendRequests
} from "../../slices/friendRequestsSlice";

const NotificationsButton = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const pendingRequests = useAppSelector(selectFriendRequests);
  const [getFriendRequests, { isLoading }] = useLazyGetFriendRequestsQuery();

  const handleOpenRequestsList = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getFriendRequests({}).then((response) => {
      dispatch(setFriendRequests(response.data.data.requests));
    });
  }, []);

  const notificationsSkeleton = () => {
    return (
      <>
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </>
    );
  };

  return (
    <Box>
      <Tooltip title="See requests">
        <IconButton onClick={handleOpenRequestsList} ref={anchorRef}>
          <Badge badgeContent={pendingRequests.length} color="secondary">
            <NotificationsIcon sx={{ width: "26px", height: "26px" }} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "right top" : "left bottom"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <Typography textAlign="center">Friend requests</Typography>
                  <List sx={{ overflow: "auto", maxHeight: "50%" }}>
                    {isLoading ? (
                      notificationsSkeleton()
                    ) : pendingRequests.length === 0 ? (
                      <Typography textAlign="center">No requests</Typography>
                    ) : (
                      pendingRequests.map((item) => (
                        <RequestItem {...item} key={item.requestId} />
                      ))
                    )}
                  </List>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default NotificationsButton;
