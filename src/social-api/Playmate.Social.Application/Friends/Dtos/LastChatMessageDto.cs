namespace Playmate.Social.Application.Friends.Dtos;

public class LastChatMessageDto
{
    public string Content { get; set; }
    public Guid SenderId { get; set; }
    public string SenderUsername { get; set;}
}
