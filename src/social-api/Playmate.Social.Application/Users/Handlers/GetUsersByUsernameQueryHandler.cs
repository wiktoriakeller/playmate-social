﻿using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Users.Dtos;
using Playmate.Social.Application.Users.Queries;
using Playmate.Social.Application.Users.Responses;

namespace Playmate.Social.Application.Users.Handlers;

public class GetUsersByUsernameQueryHandler : IHandlerWrapper<GetUsersByUsernameQuery, GetUsersByUsernameResponse>
{
    private readonly IUsersRepository _usersRepository;
    private readonly IFriendRequestsRepository _requestsRepository;
    private readonly IFriendsRepository _friendsRepository;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public GetUsersByUsernameQueryHandler(
        IUsersRepository userRepository,
        ICurrentUserService userService,
        IFriendsRepository friendsRepository,
        IFriendRequestsRepository requestsRepository,
        IMapper mapper)
    {
        _usersRepository = userRepository;
        _currentUserService = userService;
        _friendsRepository = friendsRepository;
        _requestsRepository = requestsRepository;
        _mapper = mapper;
    }

    public async Task<Response<GetUsersByUsernameResponse>> Handle(GetUsersByUsernameQuery request, CancellationToken cancellationToken)
    {
        var currentUser = _currentUserService.CurrentUser;
        var serach = request.Username.ToLower().Trim();

        var users = _usersRepository.GetWhere(u => u.Username.ToLower().Trim().Contains(serach) && u.Id != currentUser.Id);
        var mappedUsers = _mapper.Map<IEnumerable<UserDto>>(users);

        var friends = await _friendsRepository.GetFriendsAsync(currentUser);
        var friendsSet = friends.Select(f => f.Id).ToHashSet();

        var requests = await _requestsRepository.GetUsersWithPendingRequestsAsync(currentUser);
        var requestsSet = requests.ToHashSet();

        foreach (var user in mappedUsers)
        {
            if (friendsSet.Contains(user.Id))
            {
                user.IsFriend = true;
            }

            if (requestsSet.Contains(user.Id))
            {
                user.PendingRequest = true;
            }
        }

        return ResponseResult.Ok(new GetUsersByUsernameResponse(mappedUsers));
    }
}
