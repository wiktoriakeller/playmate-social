using Cassandra;
using Cassandra.Mapping;
using Playmate.Social.Infrastructure.Common.Configurations;

namespace Playmate.Social.Infrastructure.Persistence.Interfaces;

public interface ICassandraConnection
{
    CassandraConfiguration CassandraConfiguration { get; }

    IMapper CassandraMapper { get; }

    ICluster Cluster { get; }

    ISession Session { get; }

    Task Connect();

    ValueTask DisposeAsync();
}
