using FluentValidation;
using Playmate.Social.Application.Identity.Commands;

namespace Playmate.Social.Application.Common.Validators.Identity;

public class RefreshTokenCommandValidator : AbstractValidator<RefreshTokenCommand>
{
    public RefreshTokenCommandValidator()
    {
        RuleFor(x => x.JwtToken)
            .NotEmpty();

        RuleFor(x => x.RefreshToken)
            .NotEmpty();
    }
}
