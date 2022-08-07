using AutoMapper;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Application.Dtos.Requests
{
    public record AuthenticateUserRequest
    {
        public string Email { get; init; }
        public string Password { get; init; }
    }

    public class AuthenticateUserRequestProfile : Profile
    {
        public AuthenticateUserRequestProfile()
        {
            CreateMap<AuthenticateUserRequest, AuthenticateUserCommand>();
        }
    }
}