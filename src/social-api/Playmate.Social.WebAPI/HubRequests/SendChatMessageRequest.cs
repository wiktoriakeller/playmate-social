namespace Playmate.Social.WebAPI.HubRequests;

public class SendChatMessageRequest
{
    public string SenderId { get; init; }
    public string ReceiverId { get; init; }
    public string Message { get; init; }
}
