using MediatR;
using Playmate.Social.Application.Dtos;
using Playmate.Social.Application.Dtos.Responses;

namespace Playmate.Social.Application.Identity.Commands
{
    public class RefreshTokenCommand : IRequest<Response<RefreshTokenResponse>>
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}