using AutoMapper;
using Playmate.Social.Application.Identity.Responses;
using Playmate.Social.Infrastructure.Identity.Entities;

namespace Playmate.Social.Infrastructure.Identity;

internal class IdentityMappingProfile : Profile
{
    public IdentityMappingProfile()
    {
        CreateMap<User, CreateUserResponse>();
    }
}
