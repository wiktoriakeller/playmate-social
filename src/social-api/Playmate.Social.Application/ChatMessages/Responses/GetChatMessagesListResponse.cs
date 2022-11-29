using Playmate.Social.Application.ChatMessages.Dtos;

namespace Playmate.Social.Application.ChatMessages.Responses;

public class GetChatMessagesListResponse
{
    public string RoomId { get; init; }
    public IEnumerable<ChatMessageDto> ChatMessages { get; init; }
}
