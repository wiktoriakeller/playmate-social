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

    public Task<string> AddChatMessage(ChatMessage chatMessage)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<ChatMessage>> GetChatMessagesForUser(Guid userId)
    {
        throw new NotImplementedException();
    }
}
