using Playmate.Social.Infrastructure.Identity.Entities;
using System.Security.Claims;

namespace Playmate.Social.Infrastructure.Interfaces
{
    public interface IJwtService
    {
        (string jwtToken, string jti) CreateJwtToken(ApplicationUser user);

        ClaimsPrincipal? GetPrincipalFromJwtToken(string token);
    }
}