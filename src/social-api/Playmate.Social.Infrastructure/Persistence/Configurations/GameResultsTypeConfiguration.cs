using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Infrastructure.Persistence.Configurations;

public class GameResultsTypeConfiguration : IEntityTypeConfiguration<GameResult>
{
    public void Configure(EntityTypeBuilder<GameResult> builder)
    {
        builder.HasOne(g => g.Game)
            .WithMany()
            .HasForeignKey(f => f.GameId)
            .OnDelete(DeleteBehavior.ClientCascade);

        builder.HasOne(g => g.Winner)
            .WithMany()
            .HasForeignKey(f => f.WinnerId)
            .OnDelete(DeleteBehavior.ClientCascade);

        builder.HasOne(g => g.Loser)
            .WithMany()
            .HasForeignKey(f => f.LoserId)
            .OnDelete(DeleteBehavior.ClientCascade);
    }
}
