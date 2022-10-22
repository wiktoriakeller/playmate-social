using Playmate.Social.Infrastructure.Identity.Dto;
using Playmate.Social.Infrastructure.Identity.Entities;

namespace Playmate.Social.Infrastructure.Identity.Interfaces;

public interface IJwtTokenService
{
    Task<JwtTokenInfoDto> CreateJwtToken(User user);
    (bool success, string? jti, string? userId) IsJwtTokenValid(string jwtToken, bool validateLifetime);
}
