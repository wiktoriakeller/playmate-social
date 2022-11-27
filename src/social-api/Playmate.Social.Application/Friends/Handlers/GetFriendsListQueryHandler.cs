using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.Application.Friends.Queries;
using Playmate.Social.Application.Friends.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Friends.Handlers;

public class GetFriendsListQueryHandler : IHandlerWrapper<GetFriendsListQuery, GetFriendsListResponse>
{
    private readonly IFriendsRepository _friendsRepository;
    private readonly ICurrentUserService _userService;
    private readonly IMapper _mapper;

    public GetFriendsListQueryHandler(ICurrentUserService userService,
                                      IFriendsRepository friendsRepository,
                                      IMapper mapper)
    {
        _userService = userService;
        _friendsRepository = friendsRepository;
        _mapper = mapper;
    }

    public async Task<Response<GetFriendsListResponse>> Handle(GetFriendsListQuery request, CancellationToken cancellationToken)
    {
        var search = request.Search.ToLower();
        var user = _userService.CurrentUser;
        var friends = await _friendsRepository.GetFriendsWhere(user,
            friend => (!string.IsNullOrWhiteSpace(search) && friend.Username.ToLower().Contains(search)) || string.IsNullOrWhiteSpace(search));

        var mappedFriends = _mapper.Map<IEnumerable<User>, IEnumerable<FriendDto>>(friends);
        var response = new GetFriendsListResponse(mappedFriends);

        return ResponseResult.Ok(response);
    }
}
