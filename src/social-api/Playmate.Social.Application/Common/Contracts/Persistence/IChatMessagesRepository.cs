using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Persistence;

public interface IChatMessagesRepository
{
    Task<IEnumerable<ChatMessage>> GetChatMessagesForRoomIdAsync(string roomId, int pageSize);

    Task<IEnumerable<ChatMessage>> GetAllChatMessagesForRoomIdAsync(string roomId);

    Task<Guid> AddChatMessageAsync(ChatMessage chatMessage);
}
