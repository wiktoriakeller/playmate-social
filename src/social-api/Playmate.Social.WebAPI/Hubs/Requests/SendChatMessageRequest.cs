namespace Playmate.Social.WebAPI.Hubs.Requests;

public class SendChatMessageRequest
{
    public Guid SenderId { get; init; }
    public string SenderUsername { get; init; }
    public Guid ReceiverId { get; init; }
    public string Content { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
    public string JoinGameUrl { get; init; }
}
