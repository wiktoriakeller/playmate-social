﻿using AutoMapper;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.WebAPI.Requests.Users;

internal class CoursesMappingProfile : Profile
{
    public CoursesMappingProfile()
    {
        CreateMap<AuthenticateUserRequest, AuthenticateUserCommand>();
        CreateMap<CreateUserRequest, CreateUserCommand>();
        CreateMap<RefreshTokenRequest, RefreshTokenCommand>();
    }
}
