import { IResponse } from "../../baseApiResponse";

export interface ISearchUsersResponse extends IResponse {
  data: {
    users: IUserSearchItem[];
  };
}

export interface IUserSearchItem {
  id: string;
  username: string;
  isFriend: boolean;
  pendingRequest: boolean;
}
