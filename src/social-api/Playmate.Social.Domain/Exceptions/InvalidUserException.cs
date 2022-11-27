namespace Playmate.Social.Infrastructure.Exceptions;

public class InvalidUserException : Exception
{
    public InvalidUserException(string? message) : base(message)
    {
    }
}
