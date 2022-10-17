using Playmate.Social.Application.Common;
using Playmate.Social.Application.Identity.Responses;

namespace Playmate.Social.Application.Identity.Commands;

public class CreateUserCommand : IRequestWrapper<CreateUserResponse>
{
    public string Email { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
}
