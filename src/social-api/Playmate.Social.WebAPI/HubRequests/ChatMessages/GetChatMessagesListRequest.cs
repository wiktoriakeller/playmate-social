namespace Playmate.Social.WebAPI.HubRequests.ChatMessages;

public class GetChatMessagesListRequest
{
    public Guid FirstUserId { get; set; }
    public Guid SecondUserId { get; set; }
}
