using MediatR;
using Playmate.Social.Application.Dtos;
using Playmate.Social.Application.Dtos.Responses;

namespace Playmate.Social.Application.Identity.Commands
{
    public class AuthenticateUserCommand : IRequest<Response<AuthenticateUserResponse>>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}