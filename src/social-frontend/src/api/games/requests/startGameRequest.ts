export interface IStartGameRequest {
  gameUrl: string;
  payload: {
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
  };
}
