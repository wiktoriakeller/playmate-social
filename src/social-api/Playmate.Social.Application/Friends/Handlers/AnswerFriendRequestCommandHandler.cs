using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.Application.Friends.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Friends.Handlers;

public class AnswerFriendRequestCommandHandler : IHandlerWrapper<AnswerFriendRequestCommand, AnswerFriendRequestResponse>
{
    private readonly IFriendRequestRepository _requestRepository;
    private readonly IFriendRepository _friendRepository;
    private readonly ICurrentUserService _userService;

    public AnswerFriendRequestCommandHandler(IFriendRequestRepository requestRepository, IFriendRepository friendRepository, ICurrentUserService userService)
    {
        _requestRepository = requestRepository;
        _friendRepository = friendRepository;
        _userService = userService;
    }

    public async Task<Response<AnswerFriendRequestResponse>> Handle(AnswerFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var friendRequest = await _requestRepository.GetByIdAsync(request.RequestId);
        if (friendRequest == null)
        {
            return ResponseResult.NotFound<AnswerFriendRequestResponse>("Friend request not found");
        }

        var currentUser = _userService.CurrentUser;
        if (friendRequest.AddresseeId != currentUser.Id)
        {
            ResponseResult.ValidationError<AnswerFriendRequestResponse>("Current user is not the addressee of request");
        }

        if (request.Accept)
        {
            var friend = new Friend() { AddresseeId = friendRequest.AddresseeId, RequesterId = friendRequest.RequesterId };
            var createdFriend = await _friendRepository.AddAsync(friend);
            await _requestRepository.DeleteAsync(friendRequest);
            return ResponseResult.Created(new AnswerFriendRequestResponse(createdFriend.Id));
        }
        else
        {
            await _requestRepository.DeleteAsync(friendRequest);
            return ResponseResult.Deleted(new AnswerFriendRequestResponse(friendRequest.Id));
        }
    }
}
