using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Identity.Dto;

namespace Playmate.Social.Infrastructure.Identity.Interfaces;

public interface IJwtTokenService
{
    JwtTokenDto CreateJwtToken(User user);

    (bool success, string? jti, string? userId) IsJwtTokenValid(string jwtToken, bool validateLifetime);
}
