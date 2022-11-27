namespace Playmate.Social.Application.Common.Contracts.Providers;

public interface IDateTimeProvider
{
    DateTime CurrentTime { get; }
}
