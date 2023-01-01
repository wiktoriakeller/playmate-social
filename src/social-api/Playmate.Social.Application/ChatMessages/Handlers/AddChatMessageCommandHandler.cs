using AutoMapper;
using Playmate.Social.Application.ChatMessages.Commands;
using Playmate.Social.Application.ChatMessages.Responses;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Contracts.Services;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.ChatMessages.Handlers;

public class AddChatMessageCommandHandler : IHandlerWrapper<AddChatMessageCommand, AddChatMessageResponse>
{
    private readonly IChatMessagesRepository _chatMessagesRepository;
    private readonly IRoomIdProvider _roomIdProvider;
    private readonly IUsersRepository _usersRepository;
    private readonly IMapper _mapper;

    public AddChatMessageCommandHandler(
        IChatMessagesRepository chatMessagesRepository,
        IRoomIdProvider roomIdProvider,
        IUsersRepository usersRepository,
        IMapper mapper)
    {
        _chatMessagesRepository = chatMessagesRepository;
        _roomIdProvider = roomIdProvider;
        _usersRepository = usersRepository;
        _mapper = mapper;
    }

    public async Task<Response<AddChatMessageResponse>> Handle(AddChatMessageCommand request, CancellationToken cancellationToken)
    {
        var roomIdResponse = await _roomIdProvider.GetRoomIdByFriendId(request.ReceiverId);

        if (!roomIdResponse.Succeeded)
        {
            return ResponseResult.NotFound<AddChatMessageResponse>(roomIdResponse.Errors);
        }

        var friend = await _usersRepository.FirstOrDefaultAsync(u => u.Id == request.SenderId);
        var chatMessage = _mapper.Map<ChatMessage>(request);
        chatMessage.ChatRoomId = roomIdResponse.Data!;

        var messageId = await _chatMessagesRepository.AddChatMessageAsync(chatMessage);
        var response = new AddChatMessageResponse
        {
            Id = messageId,
            SenderId = request.SenderId,
            SenderUsername = friend.Username,
            ReceiverId = request.ReceiverId,
            Content = request.Content,
            CreatedAt = request.CreatedAt,
            JoinGameUrl = request.JoinGameUrl
        };

        return ResponseResult.Ok(response);
    }
}
