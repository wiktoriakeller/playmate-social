using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.Application.Friends.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Friends.Handlers;

public class ConfirmFriendRequestCommandHandler : IHandlerWrapper<ConfirmFriendRequestCommand, ConfirmFriendRequestResponse>
{
    private readonly IFriendsRequestsRepository _friendsRequestsRepository;
    private readonly IFriendsRepository _friendsRepository;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public ConfirmFriendRequestCommandHandler(
        IFriendsRequestsRepository friendsRequestsRepository,
        IFriendsRepository friendsRepository,
        ICurrentUserService currentUserService,
        IMapper mapper)
    {
        _friendsRequestsRepository = friendsRequestsRepository;
        _friendsRepository = friendsRepository;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }

    public async Task<Response<ConfirmFriendRequestResponse>> Handle(ConfirmFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var friendRequest = await _friendsRequestsRepository.GetByIdAsync(request.RequestId);
        if (friendRequest == null)
        {
            return ResponseResult.NotFound<ConfirmFriendRequestResponse>("Friend request not found");
        }

        var currentUser = _currentUserService.CurrentUser;
        if (friendRequest.AddresseeId != currentUser.Id)
        {
            ResponseResult.ValidationError<ConfirmFriendRequestResponse>("Current user is not the addressee of request");
        }

        var response = new ConfirmFriendRequestResponse() { RequestAccepted = request.Accept };

        if (request.Accept)
        {
            var friend = new Friend() { AddresseeId = friendRequest.AddresseeId, RequesterId = friendRequest.RequesterId };
            await _friendsRepository.AddAsync(friend);
            response.CreatedFriend = _mapper.Map<FriendDto>(currentUser);
        }

        await _friendsRequestsRepository.DeleteAsync(friendRequest);
        return ResponseResult.Created(response);
    }
}
