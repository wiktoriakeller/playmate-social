namespace Playmate.Social.Application.Friends.Responses;

public class AnswerFriendRequestResponse
{
    public Guid Id { get; set; }

    public AnswerFriendRequestResponse(Guid id)
    {
        Id = id;
    }
}
