using AutoMapper;
using Playmate.Social.Application.Identity.Dtos;
using Playmate.Social.Application.Identity.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Identity;

internal class IdentityMappingProfile : Profile
{
    public IdentityMappingProfile()
    {
        CreateMap<User, CreateUserResponse>();
        CreateMap<User, UserDto>();
    }
}
