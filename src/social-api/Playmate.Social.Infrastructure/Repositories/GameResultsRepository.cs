using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Persistence;

namespace Playmate.Social.Infrastructure.Repositories;

public class GameResultsRepository : BaseRepository<GameResult>, IGameResultsRepository
{
    public GameResultsRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }
}
