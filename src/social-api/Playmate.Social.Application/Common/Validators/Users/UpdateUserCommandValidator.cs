using FluentValidation;
using Playmate.Social.Application.Common.Validators.Common;
using Playmate.Social.Application.Users.Commands;

namespace Playmate.Social.Application.Common.Validators.Users;

public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
{
    public UpdateUserCommandValidator()
    {
        RuleFor(x => x.Username)
            .MinimumLength(2)
            .MaximumLength(20);

        RuleFor(x => x.FileMetadata)
            .SetValidator(new FileMetadataDtoValidator())
            .When(x => x.FileMetadata is not null);
    }
}
