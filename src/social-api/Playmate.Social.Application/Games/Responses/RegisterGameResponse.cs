namespace Playmate.Social.Application.Games.Responses;

public class RegisterGameResponse
{
    public Guid Id { get; set; }

    public RegisterGameResponse(Guid id)
    {
        Id = id;
    }
}
