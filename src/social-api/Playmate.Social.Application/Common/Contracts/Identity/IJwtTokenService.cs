using Playmate.Social.Application.Identity.Dtos;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Identity;

public interface IJwtTokenService
{
    JwtTokenDto CreateJwtToken(User user);

    (bool success, string? jti, string? userId) IsJwtTokenValid(string jwtToken, bool validateLifetime);
}
