namespace Playmate.Social.Application.ChatMessages.Dtos;

public class ChatMessageDto
{
    public Guid SenderId { get; set; }
    public Guid ReceiverId { get; set; }
    public string Content { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
