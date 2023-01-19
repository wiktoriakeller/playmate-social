using FluentValidation;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Application.Common.Validators.Identity;

public class AuthenticateExternalUserCommandValidator : AbstractValidator<AuthenticateExternalUserCommand>
{
    private const string InvalidProvider = "Provider is invalid";
    private static readonly string[] ValidProviders = new string[] { "Google" };

    public AuthenticateExternalUserCommandValidator()
    {
        RuleFor(x => x.Token)
            .NotEmpty();

        RuleFor(x => x.Provider)
            .NotEmpty()
            .Must(x => ValidProviders.Contains(x))
            .WithMessage(InvalidProvider);
    }
}
