using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Persistence.Interfaces;

namespace Playmate.Social.Infrastructure.Repositories;

public class ChatMessagesRepository : IChatMessagesRepository
{
    private readonly ICassandraDbContext _cassandraDbContext;

    public ChatMessagesRepository(ICassandraDbContext cassandraDbContext)
    {
        _cassandraDbContext = cassandraDbContext;
    }

    public async Task AddChatMessage(ChatMessage chatMessage)
    {
        await _cassandraDbContext.AddChatMessage(chatMessage);
    }

    public async Task<IEnumerable<ChatMessage>> GetChatMessagesForRoomId(string roomId)
    {
        return await _cassandraDbContext.SelectChatMessagesForChatRoomId(roomId);
    }
}
