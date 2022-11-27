using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.Application.Friends.Responses;

namespace Playmate.Social.Application.Friends.Handlers;

public class RemoveFriendCommandHandler : IHandlerWrapper<RemoveFriendCommand, RemoveFriendResponse>
{
    private readonly IFriendsRepository _friendRepository;
    private readonly ICurrentUserService _userService;

    public RemoveFriendCommandHandler(IFriendsRepository friendRepository, ICurrentUserService userService)
    {
        _friendRepository = friendRepository;
        _userService = userService;
    }

    public async Task<Response<RemoveFriendResponse>> Handle(RemoveFriendCommand request, CancellationToken cancellationToken)
    {
        var currentUser = _userService.CurrentUser;

        var friend = await _friendRepository.GetFriend(currentUser, request.FriendId);

        if (friend == null)
        {
            return ResponseResult.NotFound<RemoveFriendResponse>("Could not find friend");
        }

        await _friendRepository.DeleteAsync(friend);

        return ResponseResult.Deleted(new RemoveFriendResponse(request.FriendId));
    }
}
