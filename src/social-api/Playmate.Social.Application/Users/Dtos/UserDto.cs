namespace Playmate.Social.Application.Users.Dtos;

public class UserDto
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public bool IsFriend { get; set; }
    public string ProfilePictureUrl { get; set; }
    public bool PendingRequest { get; set; }
}
