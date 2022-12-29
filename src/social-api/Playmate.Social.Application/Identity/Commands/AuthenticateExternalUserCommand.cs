using Playmate.Social.Application.Common;
using Playmate.Social.Application.Identity.Responses;

namespace Playmate.Social.Application.Identity.Commands;

public class AuthenticateExternalUserCommand : IRequestWrapper<AuthenticateExternalUserResponse>
{
    public string Token { get; set; }
    public string Provider { get; set; }
}
