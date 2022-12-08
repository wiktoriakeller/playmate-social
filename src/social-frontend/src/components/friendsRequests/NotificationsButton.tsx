import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  Paper,
  Popper,
  Skeleton,
  Tooltip
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyGetFriendRequestsQuery } from "../../api/friends/friendsApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectFriendRequests,
  setFriendRequests
} from "../../slices/friendRequestsSlice";
import { StyledList } from "../../styled/components/mui/StyledList";
import { NotificationsContainer } from "../../styled/components/notifications/NotificationsContainer";
import { StyledBadge } from "../../styled/components/notifications/StyledBadge";
import RequestItem from "./RequestItem";

const NotificationsButton = () => {
  const dispatch = useAppDispatch();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pendingRequests = useAppSelector(selectFriendRequests);
  const [getFriendRequests, { isLoading }] = useLazyGetFriendRequestsQuery();

  const handleOpenRequestsList = useCallback(() => {
    if (pendingRequests.length > 0) {
      setOpen(true);
    }
  }, [pendingRequests, setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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
                    <StyledList dense={false}>
                      {isLoading
                        ? notificationsSkeleton()
                        : pendingRequests.map((item, index) => (
                            <RequestItem
                              request={item}
                              isLast={index === pendingRequests.length - 1}
                              key={item.requestId}
                            />
                          ))}
                    </StyledList>
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
