namespace Playmate.Social.Application.Identity.Responses;

public record AuthenticateUserResponse
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string JwtToken { get; init; }
    public string RefreshToken { get; init; }
}
