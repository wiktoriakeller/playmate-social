using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.Application.Friends.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Friends.Handlers;

public class AddFriendRequestCommandHandler : IHandlerWrapper<AddFriendRequestCommand, AddFriendRequestResponse>
{
    private readonly IFriendsRequestsRepository _friendsRequestsRepository;
    private readonly IRepository<User> _usersRepository;
    private readonly IFriendsRepository _friendsRepository;
    private readonly ICurrentUserService _currentUserService;

    public AddFriendRequestCommandHandler(
        IFriendsRequestsRepository requestsRepository,
        ICurrentUserService currentUserService,
        IRepository<User> usersRepository,
        IFriendsRepository friendsRepository)
    {
        _friendsRequestsRepository = requestsRepository;
        _currentUserService = currentUserService;
        _usersRepository = usersRepository;
        _friendsRepository = friendsRepository;
    }

    public async Task<Response<AddFriendRequestResponse>> Handle(AddFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var currentUser = _currentUserService.CurrentUser;
        var addressee = _usersRepository.GetWhere(u => u.Username == request.Username).FirstOrDefault();

        if (addressee == null)
        {
            return ResponseResult.NotFound<AddFriendRequestResponse>("Could not find user");
        }

        var friend = await _friendsRepository.GetFriendByIdAsync(currentUser, addressee.Id);

        if (friend != null)
        {
            return ResponseResult.ValidationError<AddFriendRequestResponse>("Users are friends");
        }

        var currentRequests = await _friendsRequestsRepository.GetUsersWithPendingRequestsAsync(currentUser);
        if (currentRequests.Contains(addressee.Id))
        {
            return ResponseResult.ValidationError<AddFriendRequestResponse>("Request already exists");
        }

        var friendRequest = new FriendRequest() { Requester = currentUser, Addressee = addressee };
        var createdRequest = await _friendsRequestsRepository.AddAsync(friendRequest);

        return ResponseResult.Created(new AddFriendRequestResponse(createdRequest.Id));
    }
}
