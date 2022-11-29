using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IChatMessagesRepository
{
    Task<IEnumerable<ChatMessage>> GetChatMessagesForUser(Guid userId);

    Task<string> AddChatMessage(ChatMessage chatMessage);
}
