using Playmate.Social.Application.Dtos;
using Playmate.Social.Application.Dtos.Responses;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Application.Contracts.Identity
{
    public interface IIdentityService
    {
        Task<Response<CreateUserResponse>> CreateUserAsync(CreateUserCommand createUserCommand);

        Task<Response<AuthenticateUserResponse>> AuthenticateUserAync(AuthenticateUserCommand authenticateUserCommand);

        Task<Response<RefreshTokenResponse>> RefreshTokenAsync(RefreshTokenCommand refreshTokenCommand);
    }
}