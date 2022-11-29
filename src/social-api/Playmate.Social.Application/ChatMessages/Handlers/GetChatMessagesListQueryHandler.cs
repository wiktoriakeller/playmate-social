using AutoMapper;
using Playmate.Social.Application.ChatMessages.Dtos;
using Playmate.Social.Application.ChatMessages.Queries;
using Playmate.Social.Application.ChatMessages.Responses;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;

namespace Playmate.Social.Application.ChatMessages.Handlers;

public class GetChatMessagesListQueryHandler : IHandlerWrapper<GetChatMessagesListQuery, GetChatMessagesListResponse>
{
    private readonly IChatMessagesRepository _chatMessagesRepository;
    private readonly IIdentityService _identityService;
    private readonly IMapper _mapper;

    public GetChatMessagesListQueryHandler(
        IChatMessagesRepository chatMessagesRepository,
        IIdentityService identityService,
        IMapper mapper)
    {
        _chatMessagesRepository = chatMessagesRepository;
        _identityService = identityService;
        _mapper = mapper;
    }

    public async Task<Response<GetChatMessagesListResponse>> Handle(GetChatMessagesListQuery request, CancellationToken cancellationToken)
    {
        var sender = await _identityService.GetUserById(request.FirstUserId);

        if (sender is null)
        {
            return ResponseResult.NotFound<GetChatMessagesListResponse>("First user was not found");
        }

        var receiver = await _identityService.GetUserById(request.SecondUserId);

        if (receiver is null)
        {
            return ResponseResult.NotFound<GetChatMessagesListResponse>("Second user was not found");
        }

        var firstUserName = sender.Username;
        var secondUserName = receiver.Username;
        var roomId = $"{firstUserName}{secondUserName}";

        if (string.Compare(secondUserName, firstUserName, true) < 0)
        {
            roomId = $"{secondUserName}{firstUserName}";
        }

        var messages = await _chatMessagesRepository.GetChatMessagesForRoomIdAsync(roomId);
        var messagesDto = _mapper.Map<IEnumerable<ChatMessageDto>>(messages);
        var response = new GetChatMessagesListResponse
        {
            ChatMessages = messagesDto,
            RoomId = roomId
        };

        return ResponseResult.Ok(response);
    }
}
