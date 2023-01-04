using AutoMapper;
using Playmate.Social.Application.Users.Dtos;
using Playmate.Social.Domain.Entities;

internal class UsersMappingProfile : Profile
{
    public UsersMappingProfile()
    {
        CreateMap<User, UserDto>();
    }
}
