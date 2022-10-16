using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Identity.Responses;

namespace Playmate.Social.Application.Identity.Handlers;

public class RefreshTokenCommandHandler : IHandlerWrapper<RefreshTokenCommand, RefreshTokenResponse>
{
    private readonly IIdentityService _identityService;

    public RefreshTokenCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Response<RefreshTokenResponse>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken) =>
        await _identityService.RefreshTokenAsync(request);
}
