using Playmate.Social.Application.Identity.Dtos;

namespace Playmate.Social.Application.Common.Contracts.Identity;

public interface IExternalIdentityService
{
    Task<ExternalAuthPayloadDto> VerifyGoogleToken(string token);
}
