﻿using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.Application.Friends.Responses;

namespace Playmate.Social.Application.Friends.Handlers;

public class RemoveFriendCommandHandler : IHandlerWrapper<RemoveFriendCommand, RemoveFriendResponse>
{
    private const string FriendNotFound = "Could not find friend";

    private readonly IFriendsRepository _friendsRepository;
    private readonly ICurrentUserService _currentUserService;

    public RemoveFriendCommandHandler(IFriendsRepository friendsRepository, ICurrentUserService currentUserService)
    {
        _friendsRepository = friendsRepository;
        _currentUserService = currentUserService;
    }

    public async Task<Response<RemoveFriendResponse>> Handle(RemoveFriendCommand request, CancellationToken cancellationToken)
    {
        var currentUser = _currentUserService.CurrentUser;
        var friend = await _friendsRepository.GetFriendByIdAsync(currentUser, request.FriendId);

        if (friend == null)
        {
            return ResponseResult.NotFound<RemoveFriendResponse>(FriendNotFound);
        }

        await _friendsRepository.DeleteAsync(friend);
        return ResponseResult.Deleted(new RemoveFriendResponse(request.FriendId));
    }
}
