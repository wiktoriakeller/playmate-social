namespace Playmate.Social.Domain.Entities;

public class ChatMessage
{
    public Guid Id { get; set; }
    public string ChatRoomId { get; set; }
    public Guid SenderId { get; set; }
    public Guid ReceiverId { get; set; }
    public string Content { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
