using Playmate.Social.Application.Common;
using Playmate.Social.Application.Friends.Responses;

namespace Playmate.Social.Application.Friends.Commands;

public class AnswerFriendRequestCommand : IRequestWrapper<AnswerFriendRequestResponse>
{
    public Guid RequestId { get; set; }
    public bool Accept { get; set; }
}
