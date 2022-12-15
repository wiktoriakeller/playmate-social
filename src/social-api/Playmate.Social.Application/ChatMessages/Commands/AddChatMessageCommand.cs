using Playmate.Social.Application.ChatMessages.Responses;
using Playmate.Social.Application.Common;

namespace Playmate.Social.Application.ChatMessages.Commands;

public class AddChatMessageCommand : IRequestWrapper<AddChatMessageResponse>
{
    public Guid SenderId { get; set; }
    public Guid ReceiverId { get; set; }
    public string Content { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public bool IsGameInvitation { get; set; }
}
