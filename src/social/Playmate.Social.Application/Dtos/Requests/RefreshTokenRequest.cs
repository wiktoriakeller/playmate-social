using AutoMapper;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Application.Dtos.Requests
{
    public class RefreshTokenRequest
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }

    public class RefreshTokenRequestProfile : Profile
    {
        public RefreshTokenRequestProfile()
        {
            CreateMap<RefreshTokenRequest, RefreshTokenCommand>();
        }
    }
}