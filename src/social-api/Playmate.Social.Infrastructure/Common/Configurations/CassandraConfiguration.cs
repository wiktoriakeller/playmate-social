namespace Playmate.Social.Infrastructure.Common.Configurations;

public class CassandraConfiguration
{
    public string ContactPoints { get; init; }
    public int Port { get; init; }
    public string KeySpace { get; init; }
}
