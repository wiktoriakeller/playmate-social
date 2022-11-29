using AutoMapper;
using Playmate.Social.Application.ChatMessages.Commands;
using Playmate.Social.Application.ChatMessages.Responses;
using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.ChatMessages.Handlers;

public class AddChatMessageCommandHandler : IHandlerWrapper<AddChatMessageCommand, AddChatMessageResponse>
{
    private readonly IChatMessagesRepository _chatMessagesRepository;
    private readonly IIdentityService _identityService;
    private readonly IMapper _mapper;

    public AddChatMessageCommandHandler(
        IChatMessagesRepository chatMessagesRepository,
        IIdentityService identityService,
        IMapper mapper)
    {
        _chatMessagesRepository = chatMessagesRepository;
        _identityService = identityService;
        _mapper = mapper;
    }

    public async Task<Response<AddChatMessageResponse>> Handle(AddChatMessageCommand request, CancellationToken cancellationToken)
    {
        var sender = await _identityService.GetUserById(request.SenderId);

        if (sender is null)
        {
            return ResponseResult.NotFound<AddChatMessageResponse>("Sender was not found");
        }

        var receiver = await _identityService.GetUserById(request.ReceiverId);

        if (receiver is null)
        {
            return ResponseResult.NotFound<AddChatMessageResponse>("Receiver was not found");
        }

        var senderName = sender.Username;
        var receiverName = receiver.Username;
        var roomId = $"{senderName}{receiverName}";

        if (string.Compare(receiverName, senderName, true) < 0)
        {
            roomId = $"{receiverName}{senderName}";
        }

        var chatMessage = _mapper.Map<ChatMessage>(request);
        chatMessage.ChatRoomId = roomId;

        var messageId = await _chatMessagesRepository.AddChatMessageAsync(chatMessage);
        var response = new AddChatMessageResponse { MessageId = messageId };

        return ResponseResult.Ok(response);
    }
}
