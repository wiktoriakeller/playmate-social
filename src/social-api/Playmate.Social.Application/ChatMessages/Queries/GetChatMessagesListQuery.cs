using Playmate.Social.Application.ChatMessages.Responses;
using Playmate.Social.Application.Common;

namespace Playmate.Social.Application.ChatMessages.Queries;

public class GetChatMessagesListQuery : IRequestWrapper<GetChatMessagesListResponse>
{
    public Guid FirstUserId { get; set; }
    public Guid SecondUserId { get; set; }
}
