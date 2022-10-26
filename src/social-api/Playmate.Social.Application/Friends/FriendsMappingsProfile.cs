using AutoMapper;
using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Friends;
public class FriendsMappingsProfile : Profile
{
	public FriendsMappingsProfile()
	{
		CreateMap<User, FriendDto>();
	}
}
