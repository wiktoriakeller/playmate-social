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
    private readonly IFriendRequestRepository _requestRepository;
    private readonly IRepository<User> _userRepository;
    private readonly IFriendRepository _friendRepository;
    private readonly ICurrentUserService _userService;

    public AddFriendRequestCommandHandler(IFriendRequestRepository requestRepository,
                                          ICurrentUserService userService,
                                          IRepository<User> userRepository,
                                          IFriendRepository friendRepository)
    {
        _requestRepository = requestRepository;
        _userService = userService;
        _userRepository = userRepository;
        _friendRepository = friendRepository;
    }

    public async Task<Response<AddFriendRequestResponse>> Handle(AddFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var currentUser = _userService.CurrentUser;

        var addressee = _userRepository.GetWhere(u => u.Username == request.Username).FirstOrDefault();

        if (addressee == null)
        {
            return ResponseResult.NotFound<AddFriendRequestResponse>("Could not find user");
        }

        var friend = await _friendRepository.GetFriend(currentUser, addressee.Id);

        if (friend != null)
        {
            return ResponseResult.ValidationError<AddFriendRequestResponse>("Users are friends");
        }

        var currentRequests = await _requestRepository.GetUsersWithPendingRequests(currentUser);
        if (currentRequests.Contains(addressee.Id))
        {
            return ResponseResult.ValidationError<AddFriendRequestResponse>("Request already exists");
        }

        var friendRequest = new FriendRequest() { Requester = currentUser, Addressee = addressee };

        var createdRequest = await _requestRepository.AddAsync(friendRequest);

        return ResponseResult.Created(new AddFriendRequestResponse(createdRequest.Id));
    }
}
