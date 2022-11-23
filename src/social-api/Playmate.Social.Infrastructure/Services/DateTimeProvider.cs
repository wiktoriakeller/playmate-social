using Playmate.Social.Application.Common.Contracts;

namespace Playmate.Social.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime CurrentTime => DateTime.UtcNow;
}
