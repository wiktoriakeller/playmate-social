using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Persistence;

namespace Playmate.Social.Infrastructure.Repositories;

public class GamesRepository : BaseRepository<Game>, IGamesRepository
{
    public GamesRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }
}
