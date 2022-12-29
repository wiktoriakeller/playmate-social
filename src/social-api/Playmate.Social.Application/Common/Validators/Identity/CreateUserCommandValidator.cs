using FluentValidation;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Application.Common.Validators.Identity;

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .WithMessage("Incorrect email address");

        RuleFor(x => x.Password)
            .MinimumLength(6)
            .MaximumLength(20);

        RuleFor(x => x.Username)
            .MinimumLength(2)
            .MaximumLength(20);
    }
}
