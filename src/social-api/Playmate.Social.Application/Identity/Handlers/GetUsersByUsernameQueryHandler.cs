using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Identity.Dtos;
using Playmate.Social.Application.Identity.Queries;
using Playmate.Social.Application.Identity.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Identity.Handlers;

public class GetUsersByUsernameQueryHandler : IHandlerWrapper<GetUsersByUsernameQuery, GetUsersByUsernameResponse>
{
    private readonly IRepository<User> _userRepository;
    private readonly IMapper _mapper;

    public GetUsersByUsernameQueryHandler(IRepository<User> userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public Task<Response<GetUsersByUsernameResponse>> Handle(GetUsersByUsernameQuery request, CancellationToken cancellationToken)
    {
        var users = _userRepository.GetWhere(u => u.Username.Contains(request.Username)).ToList();
        var mappedUsers = _mapper.Map<IEnumerable<UserDto>>(users);

        return Task.FromResult(ResponseResult.Ok(new GetUsersByUsernameResponse(mappedUsers)));
    }
}
