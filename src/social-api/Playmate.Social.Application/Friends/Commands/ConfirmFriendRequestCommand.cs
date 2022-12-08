using Playmate.Social.Application.Common;
using Playmate.Social.Application.Friends.Responses;

namespace Playmate.Social.Application.Friends.Commands;

public class ConfirmFriendRequestCommand : IRequestWrapper<ConfirmFriendRequestResponse>
{
    public Guid RequestId { get; set; }
    public bool Accept { get; set; }
}
