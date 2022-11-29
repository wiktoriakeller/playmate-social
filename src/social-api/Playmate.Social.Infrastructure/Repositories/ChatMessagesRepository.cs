using Cassandra.Mapping;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Persistence.Interfaces;

namespace Playmate.Social.Infrastructure.Repositories;

public class ChatMessagesRepository : IChatMessagesRepository
{
    private static readonly string _selectMessagesQuery = "SELECT * FROM chatMessages WHERE chatRoomId=?";

    private static readonly string _addMessageQuery = """
            INSERT INTO chatMessages (chatRoomId, senderId, receiverId, content, createdAt, id)
            VALUES (?, ?, ?, ?, ?, now());
        """;

    private readonly ICassandraConnection _connection;

    public ChatMessagesRepository(ICassandraConnection connection)
    {
        _connection = connection;
    }

    public async Task<IEnumerable<ChatMessage>> GetChatMessagesForRoomId(string roomId)
    {
        try
        {
            var cql = Cql.New(_selectMessagesQuery, roomId);
            return await _connection.CassandraMapper.FetchAsync<ChatMessage>(cql);
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
            var addMessageStatement = _connection.Session.Prepare(_addMessageQuery);
            var binded = addMessageStatement.Bind(chatMessage.ChatRoomId, chatMessage.SenderId, chatMessage.ReceiverId, chatMessage.Content, chatMessage.CreatedAt);
            await _connection.Session.ExecuteAsync(binded);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
