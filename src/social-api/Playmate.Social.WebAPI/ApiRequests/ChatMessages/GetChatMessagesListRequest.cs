namespace Playmate.Social.WebAPI.ApiRequests.ChatMessages;

public class GetChatMessagesListRequest
{
    public Guid FirstUserId { get; set; }
    public Guid SecondUserId { get; set; }
}
