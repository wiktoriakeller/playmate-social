import { IFriend } from "../../../slices/friendsListSlice";

export interface IFriendRequestConfirmationResponse {
  requestAccepted: boolean;
  createdFriend: IFriend;
}
