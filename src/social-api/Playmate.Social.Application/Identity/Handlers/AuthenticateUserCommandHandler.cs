using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Identity.Responses;

namespace Playmate.Social.Application.Identity.Handlers;

public class AuthenticateUserCommandHandler : IHandlerWrapper<AuthenticateUserCommand, AuthenticateUserResponse>
{
    private readonly IIdentityService _identityService;

    public AuthenticateUserCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Response<AuthenticateUserResponse>> Handle(AuthenticateUserCommand request, CancellationToken cancellationToken) =>
        await _identityService.AuthenticateUserAync(request);
}
