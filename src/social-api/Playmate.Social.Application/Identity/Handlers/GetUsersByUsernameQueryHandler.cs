using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Identity.Dtos;
using Playmate.Social.Application.Identity.Queries;
using Playmate.Social.Application.Identity.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Identity.Handlers;

public class GetUsersByUsernameQueryHandler : IHandlerWrapper<GetUsersByUsernameQuery, GetUsersByUsernameResponse>
{
    private readonly IRepository<User> _userRepository;
    private readonly IFriendRequestRepository _requestsRepository;
    private readonly IFriendRepository _friendsRepository;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _userService;

    public GetUsersByUsernameQueryHandler(IRepository<User> userRepository, IMapper mapper, ICurrentUserService userService, IFriendRepository friendsRepository, IFriendRequestRepository requestsRepository)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _userService = userService;
        _friendsRepository = friendsRepository;
        _requestsRepository = requestsRepository;
    }

    public async Task<Response<GetUsersByUsernameResponse>> Handle(GetUsersByUsernameQuery request, CancellationToken cancellationToken)
    {
        var currentUser = _userService.CurrentUser;

        var users = _userRepository.GetWhere(u => u.Username.Contains(request.Username) && u.Id != currentUser.Id).ToList();
        var mappedUsers = _mapper.Map<IEnumerable<UserDto>>(users);

        var friends = await _friendsRepository.GetFriends(currentUser);
        var friendsSet = friends.Select(f => f.Id).ToHashSet();

        var requests = await _requestsRepository.GetUsersWithPendingRequests(currentUser);
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
