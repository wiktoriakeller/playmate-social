using AutoMapper;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.WebAPI.Requests.Users;

namespace Playmate.Social.WebAPI.Requests.Mappings;

internal class CoursesMappingProfile : Profile
{
    public CoursesMappingProfile()
    {
        CreateMap<AuthenticateUserRequest, AuthenticateUserCommand>();
        CreateMap<CreateUserRequest, CreateUserCommand>();
        CreateMap<RefreshTokenRequest, RefreshTokenCommand>();
    }
}
