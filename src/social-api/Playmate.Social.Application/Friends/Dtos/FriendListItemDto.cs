namespace Playmate.Social.Application.Friends.Dtos;

public class FriendListItemDto
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string ProfilePictureUrl { get; set; }
    public DateTimeOffset? SortBy { get; set; }
    public LastChatMessageDto? LastChatMessage { get; set; }
}
