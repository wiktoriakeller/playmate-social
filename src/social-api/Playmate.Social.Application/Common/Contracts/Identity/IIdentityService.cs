﻿using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Identity.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Identity;

public interface IIdentityService
{
    Task<User?> GetUserByJwtToken(string token);

    Task<Guid> CreateUserAsync(CreateUserCommand createUserCommand);

    Task<Response<AuthenticateUserResponse>> AuthenticateUserAync(AuthenticateUserCommand authenticateUserCommand);

    Task<Response<RefreshTokenResponse>> RefreshTokenAsync(RefreshTokenCommand refreshTokenCommand);

    Task<string> CreateRefreshToken(string jti, User user);
}
