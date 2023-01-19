using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Identity.Dtos;
using Playmate.Social.Application.Identity.Responses;

namespace Playmate.Social.Application.Identity.Handlers;

public class AuthenticateExternalUserCommandHandler : IHandlerWrapper<AuthenticateExternalUserCommand, AuthenticateExternalUserResponse>
{
    private readonly IIdentityService _identityService;
    private readonly IUsersRepository _usersRepository;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IExternalIdentityService _externalIdentityService;

    private const string ExternalAuthtenticationFailed = "Authentication with external provider failed";
    private const string UsernameMustBeUnique = "User with that username already exists";
    private const string EmailMustBeUnique = "User with that email already exists";

    public AuthenticateExternalUserCommandHandler(
        IIdentityService identityService,
        IUsersRepository usersRepository,
        IJwtTokenService jwtTokenService,
        IExternalIdentityService externalIdentityService)
    {
        _identityService = identityService;
        _usersRepository = usersRepository;
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
            return ResponseResult.Unauthorized<AuthenticateExternalUserResponse>(ExternalAuthtenticationFailed);
        }

        if (payload is null || string.IsNullOrEmpty(payload.Email))
        {
            return ResponseResult.Unauthorized<AuthenticateExternalUserResponse>(ExternalAuthtenticationFailed);
        }

        var externalUserByEmail = await _usersRepository.FirstOrDefaultAsync(x => x.Email == payload.Email);

        if (externalUserByEmail is not null && !externalUserByEmail.IsExternalUser)
        {
            return ResponseResult.ValidationError<AuthenticateExternalUserResponse>(EmailMustBeUnique);
        }
        else if (externalUserByEmail is null)
        {
            var externalUserByUsername = await _usersRepository.FirstOrDefaultAsync(x => x.Username == payload.Username);

            if (externalUserByUsername is not null)
            {
                return ResponseResult.ValidationError<AuthenticateExternalUserResponse>(UsernameMustBeUnique);
            }

            var newUser = new CreateUserCommand
            {
                Email = payload.Email,
                Username = payload.Username,
                Password = string.Empty,
                ProfilePictureUrl = payload.ProfilePictureUrl,
                IsExternalUser = true
            };

            try
            {
                await _identityService.CreateUserAsync(newUser);
            }
            catch(Exception)
            {
                return ResponseResult.ValidationError<AuthenticateExternalUserResponse>(ExternalAuthtenticationFailed);
            }

            externalUserByEmail = await _usersRepository.FirstOrDefaultAsync(x => x.Email == payload.Email);
        }

        var jwtToken = _jwtTokenService.CreateJwtToken(externalUserByEmail!);
        var refreshToken = await _identityService.CreateRefreshToken(jwtToken.Jti, externalUserByEmail!);

        var response = new AuthenticateExternalUserResponse
        {
            Id = externalUserByEmail!.Id,
            Username = externalUserByEmail.Username,
            Email = externalUserByEmail.Email,
            ProfilePictureUrl = externalUserByEmail.ProfilePictureUrl,
            JwtToken = jwtToken.Token,
            RefreshToken = refreshToken
        };

        return ResponseResult.Ok(response);
    }
}
