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
    private readonly IFriendRepository _friendsRepository;
    private readonly ICurrentUserService _userService;
    private readonly IMapper _mapper;

    public GetFriendsListQueryHandler(ICurrentUserService userService,
                                      IFriendRepository friendsRepository,
                                      IMapper mapper)
    {
        _userService = userService;
        _friendsRepository = friendsRepository;
        _mapper = mapper;
    }

    public async Task<Response<GetFriendsListResponse>> Handle(GetFriendsListQuery request, CancellationToken cancellationToken)
    {
        var user = _userService.CurrentUser;

        if (user == null)
        {
            return ResponseResult.NotFound<GetFriendsListResponse>("Could not find current user");
        }

        var friends = await _friendsRepository.GetFriends(user);
        var mappedFriends = _mapper.Map<IEnumerable<User>, IEnumerable<FriendDto>>(friends);

        var response = new GetFriendsListResponse(mappedFriends);
        return ResponseResult.Ok(response);
    }
}
