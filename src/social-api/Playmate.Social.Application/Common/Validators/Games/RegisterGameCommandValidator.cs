using FluentValidation;
using Playmate.Social.Application.Common.Validators.Common;
using Playmate.Social.Application.Games.Commands;

namespace Playmate.Social.Application.Common.Validators.Games;

public class RegisterGameCommandValidator : AbstractValidator<RegisterGameCommand>
{
    private const string InvalidServerUrl = "Provided game server URL is invalid";

    public RegisterGameCommandValidator()
    {
        RuleFor(x => x.FileMetadata)
            .SetValidator(new FileMetadataDtoValidator())
            .When(x => x.FileMetadata is not null);

        RuleFor(x => x.Name)
            .MinimumLength(2)
            .MaximumLength(20);

        RuleFor(x => x.Description)
            .MaximumLength(100);

        RuleFor(x => x.ServerUrl)
            .NotEmpty()
            .Must((param, uri, context) =>
            {
                bool success = Uri.TryCreate(uri, UriKind.Absolute, out Uri? uriResult);

                if (success && uriResult?.Scheme == Uri.UriSchemeHttp || uriResult?.Scheme == Uri.UriSchemeHttps)
                {
                    return true;
                }

                return false;
            })
            .WithMessage(InvalidServerUrl);
    }
}
