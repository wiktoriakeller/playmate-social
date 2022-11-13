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
    private readonly IFriendRequestRepository _requestsRepository;
    private readonly ICurrentUserService _userService;
    private readonly IMapper _mapper;

    public GetFriendRequestsQueryHandler(IMapper mapper, ICurrentUserService userService, IFriendRequestRepository requestsRepository)
    {
        _mapper = mapper;
        _userService = userService;
        _requestsRepository = requestsRepository;
    }

    public Task<Response<GetFriendRequestsResponse>> Handle(GetFriendRequestsQuery request, CancellationToken cancellationToken)
    {
        var user = _userService.CurrentUser;

        var requests = _requestsRepository.GetWhere(r => r.AddresseeId == user.Id).ToList();

        var mappedRequests = _mapper.Map<IEnumerable<FriendRequest>, IEnumerable<FriendRequestDto>>(requests);

        var response = new GetFriendRequestsResponse(mappedRequests);
        return Task.FromResult(ResponseResult.Ok(response));
    }
}
