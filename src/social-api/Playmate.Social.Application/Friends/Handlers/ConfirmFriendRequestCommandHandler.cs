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
    private readonly IFriendRequestsRepository _friendsRequestsRepository;
    private readonly IFriendsRepository _friendsRepository;
    private readonly ICurrentUserService _currentUserService;
    private readonly IUsersRepository _usersRepository;
    private readonly IMapper _mapper;

    public ConfirmFriendRequestCommandHandler(
        IFriendRequestsRepository friendsRequestsRepository,
        IFriendsRepository friendsRepository,
        ICurrentUserService currentUserService,
        IUsersRepository usersRepository,
        IMapper mapper)
    {
        _friendsRequestsRepository = friendsRequestsRepository;
        _friendsRepository = friendsRepository;
        _currentUserService = currentUserService;
        _usersRepository = usersRepository;
        _mapper = mapper;
    }

    public async Task<Response<ConfirmFriendRequestResponse>> Handle(ConfirmFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var friendRequest = await _friendsRequestsRepository.GetByIdAsync(request.RequestId);
        if (friendRequest == null)
        {
            return ResponseResult.NotFound<ConfirmFriendRequestResponse>("Friend request was not found");
        }

        var currentUser = _currentUserService.CurrentUser;

        if (friendRequest.AddresseeId != currentUser?.Id)
        {
            ResponseResult.ValidationError<ConfirmFriendRequestResponse>("Current user is not the addressee of the request");
        }

        var requestAdresse = await _usersRepository.GetByIdAsync(_currentUserService.CurrentUser.Id);

        if (requestAdresse is null)
        {
            ResponseResult.ValidationError<ConfirmFriendRequestResponse>("Request adresse was not found");
        }

        var response = new ConfirmFriendRequestResponse() { RequestAccepted = request.Accept };

        if (request.Accept)
        {
            var friendsSince = DateTimeOffset.UtcNow;
            var friend = new Friend
            {
                AddresseeId = friendRequest.AddresseeId,
                RequesterId = friendRequest.RequesterId,
                FriendsSince = friendsSince,
            };

            await _friendsRepository.AddAsync(friend);
            response.CreatedFriend = _mapper.Map<FriendDto>(requestAdresse);
            response.CreatedFriend.FriendsSince = friendsSince;
            response.CreatedFriend.ProfilePictureUrl = requestAdresse?.ProfilePictureUrl ?? "";
        }

        await _friendsRequestsRepository.DeleteAsync(friendRequest);
        return ResponseResult.Created(response);
    }
}
