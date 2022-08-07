using MediatR;
using Playmate.Social.Application.Dtos;
using Playmate.Social.Application.Dtos.Responses;

namespace Playmate.Social.Application.Identity.Commands
{
    public class CreateUserCommand : IRequest<Response<CreateUserResponse>>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}