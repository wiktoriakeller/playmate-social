using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Identity.Dtos;
using Playmate.Social.Application.Identity.Responses;

namespace Playmate.Social.Application.Identity.Handlers;

public class AuthenticateExternalUserCommandHandler : IHandlerWrapper<AuthenticateExternalUserCommand, AuthenticateExternalUserResponse>
{
    private readonly IIdentityService _identityService;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IExternalIdentityService _externalIdentityService;

    public AuthenticateExternalUserCommandHandler(
        IIdentityService identityService,
        IJwtTokenService jwtTokenService,
        IExternalIdentityService externalIdentityService)
    {
        _identityService = identityService;
        _jwtTokenService = jwtTokenService;
        _externalIdentityService = externalIdentityService;
    }

    public async Task<Response<AuthenticateExternalUserResponse>> Handle(AuthenticateExternalUserCommand request, CancellationToken cancellationToken)
    {
        ExternalAuthPayloadDto? payload;

        try
        {
            payload = await _externalIdentityService.VerifyGoogleToken(request.Token);
        }
        catch (Exception)
        {
            return ResponseResult.Unauthorized<AuthenticateExternalUserResponse>("Authentication with external provider failed");
        }

        if (payload is null || string.IsNullOrEmpty(payload.Email))
        {
            return ResponseResult.Unauthorized<AuthenticateExternalUserResponse>("Authentication with external provider failed");
        }

        var externalUser = _identityService.GetUserByEmail(payload.Email);

        if (externalUser is null)
        {
            var newUser = new CreateUserCommand
            {
                Email = payload.Email,
                Username = payload.Email,
                Password = string.Empty
            };

            await _identityService.CreateUserAsync(newUser);
            externalUser = _identityService.GetUserByEmail(payload.Email);
        }

        var jwtToken = _jwtTokenService.CreateJwtToken(externalUser!);
        var refreshToken = await _identityService.CreateRefreshToken(jwtToken.Jti, externalUser);

        var response = new AuthenticateExternalUserResponse
        {
            Id = externalUser.Id,
            Username = externalUser.Username,
            Email = externalUser.Email,
            JwtToken = jwtToken.Token,
            RefreshToken = refreshToken
        };

        return ResponseResult.Ok(response);
    }
}
