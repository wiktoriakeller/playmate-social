using Cassandra;
using Cassandra.Mapping;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Common.Configurations;
using Playmate.Social.Infrastructure.Persistence.Interfaces;
using System.Linq.Expressions;

namespace Playmate.Social.Infrastructure.Persistence;

public class CassandraDbContext : ICassandraDbContext
{
    private readonly ICluster _cluster;
    private readonly ISession _session;
    private readonly IMapper _cassandraMapper;
    private readonly CassandraConfiguration _cassandraConfiguration;

    public CassandraDbContext(IOptions<CassandraConfiguration> cassandraConfiguration)
    {
        _cassandraConfiguration = cassandraConfiguration.Value;
        _cluster = Cluster.Builder()
            .AddContactPoint(_cassandraConfiguration.ContactPoints)
            .Build();

        var session = _cluster.Connect();
        _cassandraMapper = new Mapper(session);

        var createKeyspace = new SimpleStatement($$"""
            CREATE KEYSPACE IF NOT EXISTS ${{_cassandraConfiguration.KeySpace}}
            WITH REPLICATION = {'class': 'NetworkTopologyStrategy', 'datacenter1': 1 };
        """);
        session.Execute(createKeyspace);

        var createChatMessagesTable = new SimpleStatement($"""
            CREATE TABLE IF NOT EXISTS ${_cassandraConfiguration.KeySpace}.chatMessages (
                chatRoomId text,
                id uuid,
                senderId text,
                receiverId text,
                content text,
                createdAt timestamp),
                PRIMARY KEY ((chatRoomId), id, createdAt))
                WITH CLUSTERING ORDER BY (createdAt DESC);
        """);
        session.Execute(createChatMessagesTable);

        _session = _cluster.Connect(_cassandraConfiguration.KeySpace);
        _session.UserDefinedTypes.Define(
            UdtMap.For<ChatMessage>()
        );
    }

    public IEnumerable<ChatMessage> SelectChatMessagesForChatRoomId(string roomId, int pageSize)
    {
        try
        {
            var query = _session.Prepare("SELECT * FROM chatMessages WHERE chatRoomId=?");
            var selectQuery = $"select * from chatMessages where ";
        }
        catch (Exception)
        {
            throw;
        }
    }
}
