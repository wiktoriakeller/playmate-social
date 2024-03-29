﻿using Playmate.Social.Application.Common.Contracts.Services;

namespace Playmate.Social.Application.Common.Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime CurrentTimeUtc => DateTime.UtcNow;

    public DateTimeOffset CurrentOffsetTimeUtc => DateTimeOffset.UtcNow;
}
