namespace Playmate.Social.Infrastructure.Common.Configurations;

public class JwtTokensConfiguration
{
    public static readonly string Section = "Authentication:JwtTokensConfiguration";

    public string Key { get; init; }
    public string Issuer { get; init; }
    public string Audience { get; init; }
    public int ExpirationInMinutes { get; init; }
    public int RefreshTokenExpirationInDays { get; init; }
}
