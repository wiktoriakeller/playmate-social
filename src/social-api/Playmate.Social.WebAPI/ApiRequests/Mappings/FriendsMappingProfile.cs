using AutoMapper;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.WebAPI.ApiRequests.Friends;

namespace Playmate.Social.WebAPI.ApiRequests.Mappings;

internal class FriendsMappingProfile : Profile
{
    public FriendsMappingProfile()
    {
        CreateMap<AddFriendRequest, AddFriendRequestCommand>();
        CreateMap<ConfirmFriendRequest, ConfirmFriendRequestCommand>();
        CreateMap<RemoveFriendRequest, RemoveFriendCommand>();
    }
}
