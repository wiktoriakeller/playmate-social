namespace Playmate.Social.WebAPI.HubRequests;

public class SendChatMessageRequest
{
    public Guid SenderId { get; init; }
    public Guid ReceiverId { get; init; }
    public string Content { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
}
