using MediatR;
using Playmate.Social.Application.Contracts.Identity;
using Playmate.Social.Application.Dtos;
using Playmate.Social.Application.Dtos.Responses;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Application.Identity.Handlers
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Response<CreateUserResponse>>
    {
        private readonly IIdentityService _identitySerivce;

        public CreateUserCommandHandler(IIdentityService identitySerivce)
        {
            _identitySerivce = identitySerivce;
        }

        public async Task<Response<CreateUserResponse>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var response = await _identitySerivce.CreateUserAsync(request);
            return response;
        }
    }
}