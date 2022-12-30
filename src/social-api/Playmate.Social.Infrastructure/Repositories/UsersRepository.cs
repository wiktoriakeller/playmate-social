using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;
using Playmate.Social.Infrastructure.Persistence;

namespace Playmate.Social.Infrastructure.Repositories;

public class UsersRepository : BaseRepository<User>, IUsersRepository
{
    public UsersRepository(ApplicationDbContext dbContext) : base(dbContext)
    {
    }
}
