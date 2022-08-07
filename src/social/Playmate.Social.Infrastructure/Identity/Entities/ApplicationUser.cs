using Microsoft.AspNetCore.Identity;

namespace Playmate.Social.Infrastructure.Identity.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public RefreshToken RefreshToken { get; set; }
    }
}