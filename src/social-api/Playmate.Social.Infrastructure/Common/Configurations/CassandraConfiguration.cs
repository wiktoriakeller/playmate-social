namespace Playmate.Social.Infrastructure.Common.Configurations;

public class CassandraConfiguration
{
    public static readonly string Section = "Cassandra:Configuration";
    public static readonly string ChatProfile = "chat";

    public string ContactPoints { get; init; }
    public int Port { get; init; }
    public string KeySpace { get; init; }
    public string Username { get; init; }
    public string Password { get; init; }
}
