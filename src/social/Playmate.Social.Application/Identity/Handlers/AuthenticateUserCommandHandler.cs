using MediatR;
using Playmate.Social.Application.Contracts.Identity;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Dtos.Responses;
using Playmate.Social.Application.Dtos;

namespace Playmate.Social.Application.Identity.Handlers
{
    public class AuthenticateUserCommandHandler : IRequestHandler<AuthenticateUserCommand, Response<AuthenticateUserResponse>>
    {
        private readonly IIdentityService _identityService;

        public AuthenticateUserCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public Task<Response<AuthenticateUserResponse>> Handle(AuthenticateUserCommand request,
            CancellationToken cancellationToken)
        {
            var response = _identityService.AuthenticateUserAync(request);
            return response;
        }
    }
}