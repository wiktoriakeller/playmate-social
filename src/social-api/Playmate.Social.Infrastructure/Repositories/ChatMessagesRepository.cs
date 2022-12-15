using Cassandra;
using Cassandra.Mapping;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Common.Configurations;
using Playmate.Social.Infrastructure.Persistence.Interfaces;

namespace Playmate.Social.Infrastructure.Repositories;

public class ChatMessagesRepository : IChatMessagesRepository
{
    private static readonly string _selectMessagesQuery = "SELECT * FROM chatMessages WHERE chatRoomId=?";

    private static readonly string _addMessageQuery = """
            INSERT INTO chatMessages (chatRoomId, senderId, receiverId, content, createdAt, joinGameUrl, id)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        """;

    private readonly ICassandraConnection _connection;

    public ChatMessagesRepository(ICassandraConnection connection)
    {
        _connection = connection;
    }

    public async Task<IEnumerable<ChatMessage>> GetAllChatMessagesForRoomIdAsync(string roomId)
    {
        try
        {
            var cql = Cql.New(_selectMessagesQuery, roomId).WithExecutionProfile(CassandraConfiguration.ChatProfile);
            return await _connection.CassandraMapper.FetchAsync<ChatMessage>(cql);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IEnumerable<ChatMessage>> GetChatMessagesForRoomIdAsync(string roomId, int pageSize)
    {
        try
        {
            var cql = Cql.New(_selectMessagesQuery, roomId)
                .WithExecutionProfile(CassandraConfiguration.ChatProfile)
                .WithOptions(options => options.SetPageSize(pageSize));

            return await _connection.CassandraMapper.FetchAsync<ChatMessage>(cql);
        }
        catch(Exception)
        {
            throw;
        }
    }

    public async Task<Guid> AddChatMessageAsync(ChatMessage chatMessage)
    {
        var messageId = TimeUuid.NewId(chatMessage.CreatedAt).ToGuid();
        var addMessageStatement = _connection.Session.Prepare(_addMessageQuery);
        var binded = addMessageStatement.Bind(chatMessage.ChatRoomId, chatMessage.SenderId, chatMessage.ReceiverId, chatMessage.Content, chatMessage.CreatedAt, chatMessage.JoinGameUrl, messageId);

        try
        {
            await _connection.Session.ExecuteAsync(binded, CassandraConfiguration.ChatProfile);
            return messageId;
        }
        catch (Exception)
        {
            throw;
        }
    }
}
