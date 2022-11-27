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
    private readonly IRepository<User> _usersRepository;
    private readonly IFriendsRequestsRepository _requestsRepository;
    private readonly IFriendsRepository _friendsRepository;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public GetUsersByUsernameQueryHandler(
        IRepository<User> userRepository,
        ICurrentUserService userService,
        IFriendsRepository friendsRepository,
        IFriendsRequestsRepository requestsRepository,
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

        var users = _usersRepository.GetWhere(u => u.Username.Contains(request.Username) && u.Id != currentUser.Id).ToList();
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
