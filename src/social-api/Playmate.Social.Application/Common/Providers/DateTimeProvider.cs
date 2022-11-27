using Playmate.Social.Application.Common.Contracts.Providers;

namespace Playmate.Social.Application.Common.Providers;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime CurrentTime => DateTime.UtcNow;
}
