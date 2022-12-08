namespace Playmate.Social.Application.Common.Contracts.Services;

public interface IDateTimeProvider
{
    DateTime CurrentTime { get; }
}
