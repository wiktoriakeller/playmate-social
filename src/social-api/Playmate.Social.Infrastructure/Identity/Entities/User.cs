using Microsoft.AspNetCore.Identity;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Infrastructure.Identity.Entities;

public class User : IdentityUser<Guid>, IUser
{
    public RefreshToken RefreshToken { get; set; }
}
