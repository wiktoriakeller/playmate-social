import { IFriendRequest } from "../../../slices/friendRequestsSlice";
import { IResponse } from "../../baseApiResponse";

export interface IGetFriendRequestsResponse extends IResponse {
  data: {
    requests: IFriendRequest[];
  };
}
