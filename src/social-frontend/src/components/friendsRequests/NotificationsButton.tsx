import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  List,
  Paper,
  Popper,
  Skeleton,
  Tooltip
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLazyGetFriendRequestsQuery } from "../../api/friends/friendsApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectFriendRequests,
  setFriendRequests
} from "../../slices/friendRequestsSlice";
import { StyledBadge } from "../../styled/components/notifications/StyledBadge";
import { NotificationsContainer } from "../../styled/components/notifications/NotificationsContainer";
import RequestItem from "./RequestItem";

const NotificationsButton = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const pendingRequests = useAppSelector(selectFriendRequests);
  const [getFriendRequests, { isLoading }] = useLazyGetFriendRequestsQuery();

  const handleOpenRequestsList = () => {
    if (pendingRequests.length > 0) {
      setOpen(true);
    }
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
      <Tooltip title="Friendship requests">
        <IconButton onClick={handleOpenRequestsList} ref={anchorRef}>
          <StyledBadge badgeContent={pendingRequests.length} color="secondary">
            <NotificationsIcon sx={{ width: "28px", height: "28px" }} />
          </StyledBadge>
        </IconButton>
      </Tooltip>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
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
            <NotificationsContainer>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <Box>
                    <List
                      dense={false}
                      sx={{
                        overflowX: "hidden",
                        overflowY: "auto",
                        maxHeight: 250
                      }}
                    >
                      {pendingRequests.map((item, index) => (
                        <RequestItem
                          request={item}
                          isLast={index === pendingRequests.length - 1}
                          key={item.requestId}
                        />
                      ))}
                    </List>
                  </Box>
                </ClickAwayListener>
              </Paper>
            </NotificationsContainer>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default NotificationsButton;
