using AutoMapper;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.Application.Friends.Queries;
using Playmate.Social.WebAPI.ApiRequests.Friends;

namespace Playmate.Social.WebAPI.ApiRequests.Mappings;

public class FriendsMappingProfile : Profile
{
    public FriendsMappingProfile()
    {
        CreateMap<AddFriendRequest, AddFriendRequestCommand>();
        CreateMap<AnswerRequest, AnswerFriendRequestCommand>();
        CreateMap<GetFriendsRequest, GetFriendsListQuery>();
        CreateMap<RemoveFriendRequest, RemoveFriendCommand>();
    }
}
