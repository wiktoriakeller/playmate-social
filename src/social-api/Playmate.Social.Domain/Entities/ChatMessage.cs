namespace Playmate.Social.Domain.Entities;

public class ChatMessage
{
    public string Id { get; set; }
    public string ChatRoomId { get; set; }
    public string SenderId { get; set; }
    public string ReceiverId { get; set; }
    public string Content { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
