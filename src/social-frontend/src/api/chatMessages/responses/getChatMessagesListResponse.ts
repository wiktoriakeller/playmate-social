import { IChatMessage } from "../../../slices/chatSlice";
import { IResponse } from "../../baseApiResponse";

export interface IGetChatMessagesListResponse extends IResponse {
  data: {
    friendId: string;
    messages: IChatMessage[];
  };
}
