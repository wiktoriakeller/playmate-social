namespace Playmate.Social.Infrastructure.Common.Exceptions;

public class InvalidUserException : Exception
{
    public InvalidUserException(string? message) : base(message)
    {
    }
}
