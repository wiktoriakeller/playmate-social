using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Persistence.Interfaces;

namespace Playmate.Social.Infrastructure.Persistence;

public class CassandraDbContext : ICassandraDbContext
{
    private readonly ICassandraConnection _connection;

    public CassandraDbContext(ICassandraConnection connection)
    {
        _connection = connection;
    }

    public async Task<IEnumerable<ChatMessage>> SelectChatMessagesForChatRoomId(string roomId)
    {
        try
        {
            var query = "SELECT * FROM chatMessages WHERE chatRoomId=?";
            return await _connection.CassandraMapper.FetchAsync<ChatMessage>(query, roomId);
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
            var addMessageStatement = _connection.Session.Prepare("""
                INSERT INTO chatMessages (chatRoomId, senderId, receiverId, content, createdAt, id)
                VALUES (?, ?, ?, ?, ?, now());
            """);

            var binded = addMessageStatement.Bind(chatMessage.ChatRoomId, chatMessage.SenderId, chatMessage.ReceiverId, chatMessage.Content, chatMessage.CreatedAt);
            await _connection.Session.ExecuteAsync(binded);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
