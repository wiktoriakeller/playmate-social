namespace Playmate.Social.Application.Identity.Dtos;

public class UserDto
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public bool IsFriend { get; set; }
    public bool PendingRequest { get; set; }
}
