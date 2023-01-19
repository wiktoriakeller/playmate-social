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

public class GetFriendRequestsQueryHandler : IHandlerWrapper<GetFriendRequestsQuery, GetFriendRequestsResponse>
{
    private readonly IFriendRequestsRepository _friendsRequestsRepository;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public GetFriendRequestsQueryHandler(
        IMapper mapper,
        ICurrentUserService userService,
        IFriendRequestsRepository requestsRepository)
    {
        _mapper = mapper;
        _currentUserService = userService;
        _friendsRequestsRepository = requestsRepository;
    }

    public Task<Response<GetFriendRequestsResponse>> Handle(GetFriendRequestsQuery request, CancellationToken cancellationToken)
    {
        var user = _currentUserService.CurrentUser;

        var requests = _friendsRequestsRepository.GetWhere(r => r.AddresseeId == user.Id);
        var mappedRequests = _mapper.Map<IEnumerable<FriendRequest>, IEnumerable<FriendRequestDto>>(requests);

        var response = new GetFriendRequestsResponse(mappedRequests);
        return Task.FromResult(ResponseResult.Ok(response));
    }
}
