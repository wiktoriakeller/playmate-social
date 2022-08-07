using MediatR;
using Playmate.Social.Application.Contracts.Identity;
using Playmate.Social.Application.Dtos;
using Playmate.Social.Application.Dtos.Responses;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Application.Identity.Handlers
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, Response<RefreshTokenResponse>>
    {
        private readonly IIdentityService _identityService;

        public RefreshTokenCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<Response<RefreshTokenResponse>> Handle(RefreshTokenCommand request,
            CancellationToken cancellationToken)
        {
            var response = await _identityService.RefreshTokenAsync(request);
            return response;
        }
    }
}