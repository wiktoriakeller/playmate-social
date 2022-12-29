using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Identity.Dtos;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Common.Configurations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Playmate.Social.Infrastructure.Identity;

public class JwtTokenService : IJwtTokenService
{
    private readonly JwtTokensConfiguration _jwtOptions;
    private readonly TokenValidationParameters _tokenValidationParameters;

    public JwtTokenService(
        IOptions<JwtTokensConfiguration> jwtOptions,
        TokenValidationParameters tokenValidationParameters)
    {
        _jwtOptions = jwtOptions.Value;
        _tokenValidationParameters = tokenValidationParameters;
    }

    public JwtTokenDto CreateJwtToken(User user)
    {
        var (claims, jti) = GetJwtTokenClaims(user);

        var key = Encoding.UTF8.GetBytes(_jwtOptions.Key);
        var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwtOptions.Issuer,
            audience: _jwtOptions.Audience,
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddMinutes(_jwtOptions.ExpirationInMinutes),
            signingCredentials: signingCredentials);

        var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

        return new JwtTokenDto
        {
            Token = jwtToken,
            Jti = jti
        };
    }

    public (bool success, string? jti, string? userId) IsJwtTokenValid(string jwtToken, bool validateLifetime)
    {
        var validatedJwt = GetPrincipalFromJwtToken(jwtToken, validateLifetime);
        var jti = validatedJwt?.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti)?.Value;
        var userId = validatedJwt?.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

        if (jti == null || userId == null)
        {
            return (false, null, null);
        }

        return (true, jti, userId);
    }

    private ClaimsPrincipal? GetPrincipalFromJwtToken(string jwtToken, bool validateLifetime)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            var validationParameters = GetJwtValidationParameters(validateLifetime);
            var principal = tokenHandler.ValidateToken(jwtToken, validationParameters, out var validatedToken);

            if (!IsJwtWithValidSecurityAlgorithm(validatedToken))
            {
                return null;
            }

            return principal;
        }
        catch
        {
            return null;
        }
    }

    private bool IsJwtWithValidSecurityAlgorithm(SecurityToken validatedToken) =>
        validatedToken is JwtSecurityToken jwtSecurityToken &&
        jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase);

    private (IEnumerable<Claim> claims, string jti) GetJwtTokenClaims(User user)
    {
        var jti = Guid.NewGuid().ToString();
        var claims = new List<Claim>()
        {
            new Claim(JwtRegisteredClaimNames.Jti, jti),
            new Claim(JwtRegisteredClaimNames.Iss, _jwtOptions.Issuer),
            new Claim(JwtRegisteredClaimNames.Aud, _jwtOptions.Audience),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        return (claims, jti);
    }

    private TokenValidationParameters GetJwtValidationParameters(bool validateLifetime)
    {
        return new TokenValidationParameters
        {
            ValidateIssuerSigningKey = _tokenValidationParameters.ValidateIssuerSigningKey,
            ValidIssuer = _tokenValidationParameters.ValidIssuer,
            ValidAudience = _tokenValidationParameters.ValidAudience,
            IssuerSigningKey = _tokenValidationParameters.IssuerSigningKey,
            ValidateLifetime = validateLifetime ? true : false,
            ClockSkew = _tokenValidationParameters.ClockSkew,
        };
    }
}
