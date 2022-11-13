import { IResponse } from "../../baseApiResponse";
import { IFriend } from "../../../slices/friendsListSlice";

export interface IGetFriendsListResponse extends IResponse {
  data: {
    friends: IFriend[];
  };
}
