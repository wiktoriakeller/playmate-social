using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.Application.Friends.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Friends.Handlers;

public class AddFriendRequestCommandHandler : IHandlerWrapper<AddFriendRequestCommand, AddFriendRequestResponse>
{
    private readonly IFriendRequestsRepository _friendsRequestsRepository;
    private readonly IUsersRepository _usersRepository;
    private readonly IFriendsRepository _friendsRepository;
    private readonly ICurrentUserService _currentUserService;

    private const string UserNotFound = "User was not found";
    private const string UsersAreFriends = "Users are already friends";
    private const string RequestExists = "Request was already sent";

    public AddFriendRequestCommandHandler(
        IFriendRequestsRepository requestsRepository,
        ICurrentUserService currentUserService,
        IUsersRepository usersRepository,
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

        var addressee = await _usersRepository.FirstOrDefaultAsync(u => u.Username == request.Username);
        if (addressee is null)
        {
            return ResponseResult.NotFound<AddFriendRequestResponse>(UserNotFound);
        }

        var friend = await _friendsRepository.GetFriendByIdAsync(currentUser, addressee.Id);
        if (friend is not null)
        {
            return ResponseResult.ValidationError<AddFriendRequestResponse>(UsersAreFriends);
        }

        var currentRequests = await _friendsRequestsRepository.GetUsersWithPendingRequestsAsync(currentUser);
        if (currentRequests.Contains(addressee.Id))
        {
            return ResponseResult.ValidationError<AddFriendRequestResponse>(RequestExists);
        }

        var friendRequest = new FriendRequest() { RequesterId = currentUser.Id, AddresseeId = addressee.Id };
        var createdRequest = await _friendsRequestsRepository.AddAsync(friendRequest);

        var mappedRequest = new FriendRequestDto()
        {
            RequestId = createdRequest.Id,
            From = new FriendDto
            {
                Id = currentUser.Id,
                Username = currentUser.Username
            }
        };

        return ResponseResult.Created(new AddFriendRequestResponse(mappedRequest));
    }
}
