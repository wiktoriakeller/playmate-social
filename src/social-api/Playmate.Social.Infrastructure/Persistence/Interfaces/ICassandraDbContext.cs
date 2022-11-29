using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Infrastructure.Persistence.Interfaces;

public interface ICassandraDbContext
{
    Task AddChatMessage(ChatMessage chatMessage);

    Task<IEnumerable<ChatMessage>> SelectChatMessagesForChatRoomId(string roomId);
}
