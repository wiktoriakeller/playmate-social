using FluentValidation;
using Playmate.Social.Application.Common.Constants;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Validators.Extensions;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Application.Common.Validators.Identity;

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator(IIdentityService identityService)
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .EmailIsPresent(false, identityService)
            .WithMessage(ErrorMessages.Identity.UserWithEmailAlreadyExists);

        RuleFor(x => x.Password)
            .MinimumLength(6)
            .MaximumLength(20);

        RuleFor(x => x.UserName)
            .MinimumLength(2)
            .MaximumLength(20)
            .When(x => x.UserName?.Length > 0);
    }
}
