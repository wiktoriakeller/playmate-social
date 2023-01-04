namespace Playmate.Social.Application.Friends.Dtos;

public class FriendDto
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string ProfilePictureUrl { get; set; }
    public DateTimeOffset? FriendsSince { get; set; }
}
