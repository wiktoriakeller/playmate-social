using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Contracts.Identity;

public class ICurrentUserService
{
    IUser? User { get; }
}
