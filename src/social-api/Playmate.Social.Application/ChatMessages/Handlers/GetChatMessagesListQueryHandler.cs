using AutoMapper;
using Playmate.Social.Application.ChatMessages.Dtos;
using Playmate.Social.Application.ChatMessages.Queries;
using Playmate.Social.Application.ChatMessages.Responses;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Contracts.Services;

namespace Playmate.Social.Application.ChatMessages.Handlers;

public class GetChatMessagesListQueryHandler : IHandlerWrapper<GetChatMessagesListQuery, GetChatMessagesListResponse>
{
    private readonly IChatMessagesRepository _chatMessagesRepository;
    private readonly IRoomIdProvider _roomIdProvider;
    private readonly IMapper _mapper;

    public GetChatMessagesListQueryHandler(
        IChatMessagesRepository chatMessagesRepository,
        IRoomIdProvider roomIdProvider,
        IMapper mapper)
    {
        _chatMessagesRepository = chatMessagesRepository;
        _roomIdProvider = roomIdProvider;
        _mapper = mapper;
    }

    public async Task<Response<GetChatMessagesListResponse>> Handle(GetChatMessagesListQuery request, CancellationToken cancellationToken)
    {
        var roomIdResponse = await _roomIdProvider.GetRoomIdForUsers(request.FirstUserId, request.SecondUserId);

        if (!roomIdResponse.Succeeded)
        {
            return ResponseResult.NotFound<GetChatMessagesListResponse>(roomIdResponse.Errors);
        }

        var roomId = roomIdResponse.Data!;
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
