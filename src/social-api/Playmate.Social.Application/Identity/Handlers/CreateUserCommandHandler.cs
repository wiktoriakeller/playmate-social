using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Identity.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Identity.Handlers;

public class CreateUserCommandHandler : IHandlerWrapper<CreateUserCommand, CreateUserResponse>
{
    private readonly IIdentityService _identityService;
    private readonly IRepository<User> _usersRepository;

    public CreateUserCommandHandler(IIdentityService identitySerivce, IRepository<User> usersRepository)
    {
        _identityService = identitySerivce;
        _usersRepository = usersRepository;
    }

    public async Task<Response<CreateUserResponse>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var userByEmail = _identityService.GetUserByEmail(request.Email);

        if (userByEmail is not null)
        {
            return ResponseResult.ValidationError<CreateUserResponse>("User with that email already exists");
        }

        var userByUsername = _usersRepository.GetWhere(u => u.Username == request.Username);

        if (userByUsername is not null)
        {
            return ResponseResult.ValidationError<CreateUserResponse>("User with that username already exists");
        }

        var userId = await _identityService.CreateUserAsync(request);
        var response = new CreateUserResponse
        {
            Id = userId
        };

        return ResponseResult.Ok(response);
    }
}
