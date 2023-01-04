using Cassandra;
using Cassandra.Mapping;
using Microsoft.Extensions.Options;
using Playmate.Social.Infrastructure.Common.Configurations;
using Playmate.Social.Infrastructure.Persistence.Interfaces;
using System.Net.Security;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;

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
        var clusterBuilder = Cassandra.Cluster.Builder();
        if (CassandraConfiguration.Password.Length != 0)
        {
            var options = new SSLOptions(SslProtocols.Tls12, true, ValidateServerCertificate);
            options.SetHostNameResolver((ipAddress) => CassandraConfiguration.ContactPoints);

            clusterBuilder.WithCredentials(CassandraConfiguration.Username, CassandraConfiguration.Password)
                .WithSSL(options);
        }

        Cluster = clusterBuilder.WithPort(CassandraConfiguration.Port)
            .AddContactPoint(CassandraConfiguration.ContactPoints)
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

    public static bool ValidateServerCertificate(
            object sender,
            X509Certificate certificate,
            X509Chain chain,
            SslPolicyErrors sslPolicyErrors)
    {
        if (sslPolicyErrors == SslPolicyErrors.None)
        {
            return true;
        }

        return false;
    }
}
