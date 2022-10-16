﻿using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Application.Identity.Responses;

namespace Playmate.Social.Application.Identity.Handlers;

public class CreateUserCommandHandler : IHandlerWrapper<CreateUserCommand, CreateUserResponse>
{
    private readonly IIdentityService _identitySerivce;

    public CreateUserCommandHandler(IIdentityService identitySerivce)
    {
        _identitySerivce = identitySerivce;
    }

    public async Task<Response<CreateUserResponse>> Handle(CreateUserCommand request, CancellationToken cancellationToken) =>
        await _identitySerivce.CreateUserAsync(request);
}
