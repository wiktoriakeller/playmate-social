namespace Playmate.Social.Application.ChatMessages.Responses;

public class AddChatMessageResponse
{
    public Guid Id { get; init; }
    public Guid SenderId { get; init; }
    public string SenderUsername { get; init; }
    public Guid ReceiverId { get; init; }
    public string Content { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
    public bool IsGameInvitation { get; init; }
}
