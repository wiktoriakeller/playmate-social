namespace Playmate.Social.Application.Games.Responses;

public class RegisterGameResponse
{
    public Guid Id { get; init; }

    public RegisterGameResponse(Guid id)
    {
        Id = id;
    }
}
