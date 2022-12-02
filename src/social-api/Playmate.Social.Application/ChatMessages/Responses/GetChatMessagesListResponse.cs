using Playmate.Social.Application.ChatMessages.Dtos;

namespace Playmate.Social.Application.ChatMessages.Responses;

public class GetChatMessagesListResponse
{
    public required Guid FriendId { get; init  ; }
    public required IEnumerable<ChatMessageDto> Messages { get; init; }
}
