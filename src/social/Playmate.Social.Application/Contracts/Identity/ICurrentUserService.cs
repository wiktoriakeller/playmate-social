namespace Playmate.Social.Application.Contracts.Identity
{
    public interface ICurrentUserService
    {
        string? UserId { get; }
    }
}