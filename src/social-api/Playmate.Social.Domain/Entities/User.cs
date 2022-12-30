namespace Playmate.Social.Domain.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public bool IsExternalUser { get; set; }
    public RefreshToken? RefreshToken { get; set; }
}
