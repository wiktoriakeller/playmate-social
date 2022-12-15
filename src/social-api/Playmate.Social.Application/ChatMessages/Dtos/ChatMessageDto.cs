namespace Playmate.Social.Application.ChatMessages.Dtos;

public class ChatMessageDto
{
    public Guid Id { get; set; }
    public Guid SenderId { get; set; }
    public Guid ReceiverId { get; set; }
    public string Content { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public bool IsGameInvitation { get; set; }
}
