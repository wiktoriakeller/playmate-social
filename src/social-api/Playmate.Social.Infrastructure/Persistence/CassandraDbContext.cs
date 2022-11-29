using Cassandra;
using Cassandra.Mapping;
using Microsoft.Extensions.Options;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Common.Configurations;
using Playmate.Social.Infrastructure.Persistence.Interfaces;

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
            .WithPort(_cassandraConfiguration.Port)
            .Build();

        var session = _cluster.Connect();

        var createKeyspace = new SimpleStatement($$"""
            CREATE KEYSPACE IF NOT EXISTS {{_cassandraConfiguration.KeySpace}}
            WITH REPLICATION = {'class': 'NetworkTopologyStrategy', 'datacenter1': 1 };
        """);
        session.Execute(createKeyspace);

        var createChatMessagesTable = new SimpleStatement($"""
            CREATE TABLE IF NOT EXISTS {_cassandraConfiguration.KeySpace}.chatMessages (
                chatRoomId text,
                id uuid,
                senderId uuid,
                receiverId uuid,
                content text,
                createdAt timestamp,
                PRIMARY KEY ((chatRoomId), createdAt, id))
                WITH CLUSTERING ORDER BY (createdAt DESC, id ASC);
        """);
        session.Execute(createChatMessagesTable);

        _session = _cluster.Connect(_cassandraConfiguration.KeySpace);
        _cassandraMapper = new Mapper(_session);
    }

    public async Task<IEnumerable<ChatMessage>> SelectChatMessagesForChatRoomId(string roomId)
    {
        try
        {
            var query = "SELECT * FROM chatMessages WHERE chatRoomId=?";
            return await _cassandraMapper.FetchAsync<ChatMessage>(query, roomId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task AddChatMessage(ChatMessage chatMessage)
    {
        try
        {
            var addMessageStatement = _session.Prepare("""
                INSERT INTO chatMessages (chatRoomId, senderId, receiverId, content, createdAt, id)
                VALUES (?, ?, ?, ?, ?, now());
            """);

            var binded = addMessageStatement.Bind(chatMessage.ChatRoomId, chatMessage.SenderId, chatMessage.ReceiverId, chatMessage.Content, chatMessage.CreatedAt);
            await _session.ExecuteAsync(binded);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
