﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Infrastructure.Persistence.EntitiesConfigurations;

public class UserTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasIndex(x => x.Email).IsUnique();

        builder.HasIndex(x => x.Username).IsUnique();

        builder.Property(x => x.Username)
            .HasMaxLength(20);

        builder.Property(x => x.Email)
            .HasMaxLength(100);
    }
}
