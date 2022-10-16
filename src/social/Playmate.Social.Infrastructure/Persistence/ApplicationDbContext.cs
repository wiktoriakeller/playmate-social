using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Playmate.Social.Infrastructure.Identity.Entities;
using System.Reflection.Emit;

namespace Playmate.Social.Infrastructure.Persistence;

public class ApplicationDbContext : IdentityDbContext<User, Role, Guid>
{
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}
