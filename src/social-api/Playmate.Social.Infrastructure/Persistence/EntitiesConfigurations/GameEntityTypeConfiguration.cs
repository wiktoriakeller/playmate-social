using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Infrastructure.Persistence.EntitiesConfigurations;

public class GameEntityTypeConfiguration : IEntityTypeConfiguration<Game>
{
    public void Configure(EntityTypeBuilder<Game> builder)
    {
        builder.Property(x => x.Name)
            .HasMaxLength(20);

        builder.Property(x => x.Description)
            .HasMaxLength(100);

        builder.HasIndex(x => x.Name).IsUnique();
    }
}
