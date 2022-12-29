using AutoMapper;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.WebAPI.ApiRequests.Users;

namespace Playmate.Social.WebAPI.ApiRequests.Mappings;

internal class CoursesMappingProfile : Profile
{
    public CoursesMappingProfile()
    {
        CreateMap<AuthenticateUserRequest, AuthenticateUserCommand>();
        CreateMap<AuthenticateExternalUserRequest, AuthenticateExternalUserCommand>();
        CreateMap<CreateUserRequest, CreateUserCommand>();
        CreateMap<RefreshTokenRequest, RefreshTokenCommand>();
    }
}
