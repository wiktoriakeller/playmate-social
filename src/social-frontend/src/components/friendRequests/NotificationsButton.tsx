import NotificationsIcon from "@mui/icons-material/Notifications";
import {
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
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import {
  selectFriendRequests,
  setFriendRequests
} from "../../slices/friendRequestsSlice";
import { StyledList } from "../../styled/components/common/StyledList";
import { NotificationsContainer } from "../../styled/components/notifications/NotificationsContainer";
import { StyledBadge } from "../../styled/components/notifications/StyledBadge";
import RequestItem from "./RequestItem";

const NotificationsButton = () => {
  const dispatch = useAppDispatch();
  const pendingRequests = useAppSelector(selectFriendRequests);
  const [getFriendRequests, { isLoading }] = useLazyGetFriendRequestsQuery();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpenRequestsList = useCallback(() => {
    if (pendingRequests.length > 0) {
      setOpen(true);
    }
  }, [pendingRequests, setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    getFriendRequests().then((response) => {
      if (!!response.data) {
        dispatch(setFriendRequests(response.data.data.requests));
      }
    });
  }, [getFriendRequests, dispatch]);

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
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={handleOpenRequestsList} ref={anchorRef}>
          <StyledBadge badgeContent={pendingRequests.length} color="secondary">
            <NotificationsIcon />
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
                </ClickAwayListener>
              </Paper>
            </NotificationsContainer>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default NotificationsButton;
