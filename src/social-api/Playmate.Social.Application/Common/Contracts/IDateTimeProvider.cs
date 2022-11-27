namespace Playmate.Social.Application.Common.Contracts;

public interface IDateTimeProvider
{
    DateTime CurrentTime { get; }
}
