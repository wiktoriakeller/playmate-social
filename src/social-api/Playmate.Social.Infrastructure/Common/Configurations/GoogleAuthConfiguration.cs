namespace Playmate.Social.Infrastructure.Common.Configurations;

public class GoogleAuthConfiguration
{
    public static readonly string Section = "Authentication:Google";

    public string ClientId { get; init; }
    public string ClientSecret { get; init; }
}
