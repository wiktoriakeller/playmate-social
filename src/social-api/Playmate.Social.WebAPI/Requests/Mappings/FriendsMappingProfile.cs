using AutoMapper;
using Playmate.Social.Application.Friends.Commands;
using Playmate.Social.Application.Friends.Queries;
using Playmate.Social.WebAPI.Requests.Friends;

namespace Playmate.Social.WebAPI.Requests.Mappings;
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
