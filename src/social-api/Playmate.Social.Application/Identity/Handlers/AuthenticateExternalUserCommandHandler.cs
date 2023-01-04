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
            return ResponseResult.Unauthorized<AuthenticateExternalUserResponse>("Authentication with external provider failed");
        }

        if (payload is null || string.IsNullOrEmpty(payload.Email))
        {
            return ResponseResult.Unauthorized<AuthenticateExternalUserResponse>("Authentication with external provider failed");
        }

        var externalUserByEmail = await _usersRepository.FirstOrDefaultAsync(x => x.Email == payload.Email);
        var externalUserByUsername = await _usersRepository.FirstOrDefaultAsync(x => x.Username == payload.Username);

        if (externalUserByEmail is null && externalUserByUsername is null)
        {
            var newUser = new CreateUserCommand
            {
                Email = payload.Email,
                Username = payload.Username,
                Password = string.Empty,
                ProfilePictureUrl = payload.ProfilePictureUrl ?? string.Empty,
                IsExternalUser = true
            };

            await _identityService.CreateUserAsync(newUser);
            externalUserByEmail = await _usersRepository.FirstOrDefaultAsync(x => x.Email == payload.Email);
        }
        else if (externalUserByEmail is not null && !externalUserByEmail.IsExternalUser)
        {
            return ResponseResult.ValidationError<AuthenticateExternalUserResponse>("User with that email already exists");
        }
        else if (externalUserByUsername is not null && externalUserByUsername.Email != payload.Email)
        {
            return ResponseResult.ValidationError<AuthenticateExternalUserResponse>("User with that username already exists");
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
