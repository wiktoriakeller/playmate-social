using FluentValidation;
using Playmate.Social.Application.Users.Commands;

namespace Playmate.Social.Application.Common.Validators.Users;

public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
    private const long MaxFileSize = 1048576;
    private static readonly string[] PermittedExtensions = new string[] { "image/jpeg", "image/jpg", "image/png" };

    public UpdateUserCommandValidator()
    {
        RuleFor(x => x.Username)
            .MinimumLength(2)
            .MaximumLength(20);

        RuleFor(x => x.PictureSize)
            .LessThanOrEqualTo(MaxFileSize);

        RuleFor(x => x.PictureType)
            .Must(x => PermittedExtensions.Contains(x))
            .WithMessage("Only '.jpg' and '.png' are valid extensions");
    }
}
