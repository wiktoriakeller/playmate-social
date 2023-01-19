using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Identity.Responses;

namespace Playmate.Social.Application.Identity.Handlers;

public class CreateUserCommandHandler : IHandlerWrapper<CreateUserCommand, CreateUserResponse>
{
    private readonly IUsersRepository _usersRepository;
    private readonly IIdentityService _identityService;

    private const string UsernameMustBeUnique = "User with that username already exists";
    private const string EmailMustBeUnique = "User with that email already exists";

    public CreateUserCommandHandler(IUsersRepository usersRepository, IIdentityService identityService)
    {
        _usersRepository = usersRepository;
        _identityService = identityService;
    }

    public async Task<Response<CreateUserResponse>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var userByEmail = _usersRepository.FirstOrDefaultAsync(x => x.Email == request.Email);
        var userByUsername = _usersRepository.FirstOrDefaultAsync(x => x.Email == request.Username);

        if (await userByEmail is not null)
        {
            return ResponseResult.ValidationError<CreateUserResponse>(EmailMustBeUnique);
        }

        if (await userByUsername is not null)
        {
            return ResponseResult.ValidationError<CreateUserResponse>(UsernameMustBeUnique);
        }

        request.IsExternalUser = false;
        var userId = await _identityService.CreateUserAsync(request);
        var response = new CreateUserResponse
        {
            Id = userId
        };

        return ResponseResult.Ok(response);
    }
}
