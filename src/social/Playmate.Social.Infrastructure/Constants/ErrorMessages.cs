namespace Playmate.Social.Infrastructure.Constants
{
    public static class ErrorMessages
    {
        public static class Identity
        {
            public const string InvalidJwt = "Invalid JWT token";
            public const string InvalidRefreshToken = "This refresh token does not exist or is invalid";
            public const string IncorrectCredentials = "Incorrect credentials";
        }
    }
}