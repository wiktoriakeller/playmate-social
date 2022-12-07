namespace Playmate.Social.WebAPI.ApiRequests.Friends;

public class AnswerRequest
{
    public bool Accept { get; set; }
    public Guid RequestId { get; set; }
    public Guid RequesterId { get; set; }
}   
