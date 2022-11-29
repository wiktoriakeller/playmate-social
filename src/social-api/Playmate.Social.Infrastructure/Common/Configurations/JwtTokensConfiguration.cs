namespace Playmate.Social.Infrastructure.Common.Configurations;

public class JwtTokensConfiguration
{
    public string Key { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public int ExpirationInMinutes { get; set; }
    public int RefreshTokenExpirationInDays { get; set; }
}
