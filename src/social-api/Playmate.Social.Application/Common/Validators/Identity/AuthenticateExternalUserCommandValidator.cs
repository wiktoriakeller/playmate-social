using FluentValidation;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Application.Common.Validators.Identity;

public class AuthenticateExternalUserCommandValidator : AbstractValidator<AuthenticateExternalUserCommand>
{
    public AuthenticateExternalUserCommandValidator()
    {
        RuleFor(x => x.Token)
            .NotEmpty();

        RuleFor(x => x.Provider)
            .NotEmpty();
    }
}
