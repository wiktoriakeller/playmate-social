using Google.Apis.Auth;
using Microsoft.Extensions.Options;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Identity.Dtos;
using Playmate.Social.Infrastructure.Common.Configurations;

namespace Playmate.Social.Infrastructure.Identity;

public class ExternaIdentityService : IExternalIdentityService
{
    private readonly GoogleAuthConfiguration _googleAuthConfig;

    public ExternaIdentityService(IOptions<GoogleAuthConfiguration> googleAuthenticationConfiguration)
    {
        _googleAuthConfig = googleAuthenticationConfiguration.Value;
    }

    public async Task<ExternalAuthPayloadDto> VerifyGoogleToken(string token)
    {
        var validationSettings = new GoogleJsonWebSignature.ValidationSettings
        {
            Audience = new List<string>
            {
                _googleAuthConfig.ClientId
            },
        };

        var payload = await GoogleJsonWebSignature.ValidateAsync(token, validationSettings);

        return new ExternalAuthPayloadDto
        {
            Email = payload.Email,
        };
    }
}
