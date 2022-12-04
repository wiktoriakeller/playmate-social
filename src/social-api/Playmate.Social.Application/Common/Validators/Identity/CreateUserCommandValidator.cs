using FluentValidation;
using Playmate.Social.Application.Common.Constants;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Validators.Extensions;
using Playmate.Social.Application.Identity.Commands;
using Playmate.Social.Domain.Entities;

namespace Playmate.Social.Application.Common.Validators.Identity;

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator(IIdentityService identityService, IRepository<User> repository)
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .WithMessage("Incorrect email address")
            .UserWithEmailShouldExist(false, identityService)
            .WithMessage(ErrorMessages.Identity.UserWithEmailAlreadyExists);

        RuleFor(x => x.Password)
            .MinimumLength(6)
            .MaximumLength(20);

        RuleFor(x => x.Username)
            .MinimumLength(2)
            .MaximumLength(20)
            .UserWithUsernameShouldExist(false, repository)
            .WithMessage(ErrorMessages.Identity.UserWithUsernameAlreadyExists);
    }
}
