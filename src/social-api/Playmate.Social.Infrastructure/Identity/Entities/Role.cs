using Microsoft.AspNetCore.Identity;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Infrastructure.Identity.Entities;

public class Role : IdentityRole<Guid>, IEntity
{
}
