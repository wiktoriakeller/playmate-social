namespace Playmate.Social.Application.Common.Contracts.Services;

public interface IDateTimeProvider
{
    DateTime CurrentTimeUtc { get; }
    DateTimeOffset CurrentOffsetTimeUtc { get; }
}
