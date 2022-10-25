﻿using Microsoft.AspNetCore.Http;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Infrastructure.Identity;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public User? CurrentUser => GetCurrentUser();

    private User? GetCurrentUser()
    {
        if (_httpContextAccessor.HttpContext is null)
        {
            return null;
        }

        if (_httpContextAccessor.HttpContext.Items.ContainsKey("User"))
        {
            return _httpContextAccessor.HttpContext?.Items["User"] as User;
        }

        return null;
    }
}
