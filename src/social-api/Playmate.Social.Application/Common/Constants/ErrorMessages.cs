namespace Playmate.Social.Application.Common.Constants;

public static class ErrorMessages
{
    public static class Identity
    {
        public const string UnauthorizedUser = "User is unauthorized to access that resource";
        public const string InvalidToken = "Token is invalid";
        public const string IncorrectCredentials = "Incorrect credentials";
        public const string UserNotFound = "User was not found";
        public const string UserWithEmailAlreadyExists = "User with that email already exists";
        public const string UserWithUsernameAlreadyExists = "User with that username already exists";
    }
}
