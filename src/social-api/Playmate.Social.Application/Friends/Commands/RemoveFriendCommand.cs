using Playmate.Social.Application.Common;
using Playmate.Social.Application.Friends.Responses;

namespace Playmate.Social.Application.Friends.Commands;

public class RemoveFriendCommand : IRequestWrapper<RemoveFriendResponse>
{
    public Guid FriendId { get; set; }
}
