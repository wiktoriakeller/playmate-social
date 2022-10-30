using Playmate.Social.Application.Common;
using Playmate.Social.Application.Friends.Responses;

namespace Playmate.Social.Application.Friends.Commands;

public class AddFriendRequestCommand : IRequestWrapper<AddFriendRequestResponse>
{
    public string Username { get; set; }
}
