using Playmate.Social.Application.Common;
using Playmate.Social.Application.Identity.Responses;

namespace Playmate.Social.Application.Identity.Commands;

public class CreateUserCommand : IRequestWrapper<CreateUserResponse>
{
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public bool IsExternalUser { get; set; }
    public string ProfilePictureUrl { get; set; } = string.Empty;
    public string ProfilePictureName { get; set; } = string.Empty;
}
