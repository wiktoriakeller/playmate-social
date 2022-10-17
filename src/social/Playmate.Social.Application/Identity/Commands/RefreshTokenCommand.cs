using Playmate.Social.Application.Common;
using Playmate.Social.Application.Identity.Responses;

namespace Playmate.Social.Application.Identity.Commands;

public class RefreshTokenCommand : IRequestWrapper<RefreshTokenResponse>
{
    public string JwtToken { get; set; }
    public string RefreshToken { get; set; }
}
