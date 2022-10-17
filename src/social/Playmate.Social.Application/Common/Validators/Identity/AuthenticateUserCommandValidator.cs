using FluentValidation;
using Playmate.Social.Application.Common.Constants;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Validators.Extensions;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Application.Common.Validators.Identity;

public class AuthenticateUserCommandValidator : AbstractValidator<AuthenticateUserCommand>
{
    public AuthenticateUserCommandValidator(IIdentityService identityService)
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .UserWithEmailShouldExist(true, identityService)
            .WithMessage(ErrorMessages.Identity.UserNotFound);

        RuleFor(x => x.Password)
            .NotEmpty();
    }
}
