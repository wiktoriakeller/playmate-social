using AutoMapper;
using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Friends;

internal class FriendsMappingsProfile : Profile
{
    public FriendsMappingsProfile()
    {
        CreateMap<User, FriendDto>();
        CreateMap<FriendRequest, FriendRequestDto>()
            .ForMember(d => d.From, o => o.MapFrom(s => s.Requester))
            .ForMember(d => d.RequestId, o => o.MapFrom(s => s.Id));
        CreateMap<User, FriendListItemDto>();
        CreateMap<FriendDto, FriendListItemDto>()
            .ForMember(d => d.SortBy, o => o.MapFrom(s => s.FriendsSince));
    }
}
