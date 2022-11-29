using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IChatMessagesRepository
{
    Task<IEnumerable<ChatMessage>> GetChatMessagesForRoomId(string roomId);

    Task AddChatMessage(ChatMessage chatMessage);
}
