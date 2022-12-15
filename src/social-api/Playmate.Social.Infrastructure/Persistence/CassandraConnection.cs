using Cassandra;
using Cassandra.Mapping;
using Microsoft.Extensions.Options;
using Playmate.Social.Infrastructure.Common.Configurations;
using Playmate.Social.Infrastructure.Persistence.Interfaces;

namespace Playmate.Social.Infrastructure.Persistence;

public class CassandraConnection : IAsyncDisposable, ICassandraConnection
{
    public ICluster Cluster { get; private set; }
    public ISession Session { get; private set; }
    public IMapper CassandraMapper { get; private set; }
    public CassandraConfiguration CassandraConfiguration { get; private set; }

    public CassandraConnection(IOptions<CassandraConfiguration> cassandraConfiguration)
    {
        CassandraConfiguration = cassandraConfiguration.Value;
    }

    public async Task Connect()
    {
        Cluster = Cassandra.Cluster.Builder()
            .AddContactPoint(CassandraConfiguration.ContactPoints)
            .WithPort(CassandraConfiguration.Port)
            .WithExecutionProfiles(options => options
                .WithProfile(CassandraConfiguration.ChatProfile, profile => profile
                    .WithConsistencyLevel(ConsistencyLevel.LocalOne)))
            .Build();

        var session = await Cluster.ConnectAsync();
        await CreateChatTableIfNotExists(session);

        Session = await Cluster.ConnectAsync(CassandraConfiguration.KeySpace);
        CassandraMapper = new Mapper(Session);
    }

    public async ValueTask DisposeAsync()
    {
        await Cluster.ShutdownAsync();
    }

    private async Task CreateChatTableIfNotExists(ISession session)
    {
        var createKeyspace = new SimpleStatement($$"""
            CREATE KEYSPACE IF NOT EXISTS {{CassandraConfiguration.KeySpace}}
            WITH REPLICATION = {
                'class': 'NetworkTopologyStrategy',
                'datacenter1': 1
            };
        """);

        var createChatMessagesTable = new SimpleStatement($"""
            CREATE TABLE IF NOT EXISTS {CassandraConfiguration.KeySpace}.chatMessages (
                chatRoomId text,
                id uuid,
                senderId uuid,
                receiverId uuid,
                content text,
                createdAt timestamp,
                joinGameUrl text,
                PRIMARY KEY ((chatRoomId), createdAt, id))
                WITH CLUSTERING ORDER BY (createdAt DESC, id ASC);
        """);

        await session.ExecuteAsync(createKeyspace);
        await session.ExecuteAsync(createChatMessagesTable);
    }
}
