using AutoMapper;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Contracts.Services;
using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.Application.Friends.Queries;
using Playmate.Social.Application.Friends.Responses;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Friends.Handlers;

public class GetFriendsListQueryHandler : IHandlerWrapper<GetFriendsListQuery, GetFriendsListResponse>
{
    private readonly IFriendsRepository _friendsRepository;
    private readonly ICurrentUserService _currentUserService;
    private readonly IChatMessagesRepository _chatMessagesRepository;
    private readonly IRoomIdProvider _roomIdProvider;
    private readonly IMapper _mapper;

    public GetFriendsListQueryHandler(
        ICurrentUserService currentUserService,
        IFriendsRepository friendsRepository,
        IChatMessagesRepository chatMessagesRepository,
        IRoomIdProvider roomIdProvider,
        IMapper mapper)
    {
        _currentUserService = currentUserService;
        _friendsRepository = friendsRepository;
        _chatMessagesRepository = chatMessagesRepository;
        _roomIdProvider = roomIdProvider;
        _mapper = mapper;
    }

    public async Task<Response<GetFriendsListResponse>> Handle(GetFriendsListQuery request, CancellationToken cancellationToken)
    {
        var search = request.Search.ToLower().Trim();
        var currentUser = _currentUserService.CurrentUser;
        
        var friends = await _friendsRepository.GetFriendsWhereAsync(currentUser,
            friend => (!string.IsNullOrWhiteSpace(search) && friend.Username.ToLower().Contains(search)) || string.IsNullOrWhiteSpace(search));

        var mappedFriends = _mapper.Map<IEnumerable<User>, IEnumerable<FriendListItemDto>>(friends);

        foreach(var friend in mappedFriends)
        {
            var roomIdResponse = await _roomIdProvider.GetRoomIdByFriendId(friend.Id);
            
            if(roomIdResponse.Succeeded)
            {
                var messages = await _chatMessagesRepository.GetChatMessagesForRoomIdAsync(roomIdResponse.Data, 2);
                var lastMessage = messages?.FirstOrDefault();
                
                if(lastMessage is not null)
                {
                    var mappedMessage = new LastChatMessageDto
                    {
                        Content = lastMessage.Content,
                        SenderId = lastMessage.SenderId,
                        CreatedAt = lastMessage.CreatedAt,
                        SenderUsername = lastMessage.SenderId == currentUser.Id ? currentUser.Username : friend.Username
                    };
                    
                    friend.LastChatMessage = mappedMessage;
                }
            }
        }

        mappedFriends = mappedFriends.OrderByDescending(x => x.LastChatMessage?.CreatedAt);
        var response = new GetFriendsListResponse(mappedFriends);
        return ResponseResult.Ok(response);
    }
}
