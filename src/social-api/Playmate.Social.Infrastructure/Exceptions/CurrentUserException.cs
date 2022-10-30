namespace Playmate.Social.Infrastructure.Exceptions;

public class CurrentUserException : Exception
{
    public CurrentUserException(string? message) : base(message)
    {
    }
}
