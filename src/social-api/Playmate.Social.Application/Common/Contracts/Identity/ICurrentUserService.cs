using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Identity;

public interface ICurrentUserService
{
    IUser? User { get; }
}
