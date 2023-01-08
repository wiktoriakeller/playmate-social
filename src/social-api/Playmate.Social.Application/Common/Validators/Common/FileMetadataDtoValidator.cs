using FluentValidation;
using Playmate.Social.Application.Common.Dtos;

namespace Playmate.Social.Application.Common.Validators.Common;

public class FileMetadataDtoValidator : AbstractValidator<FileMetadataDto>
{
    private const long MaxFileSize = 1048576;
    private static readonly string[] PermittedExtensions = new string[] { "image/jpeg", "image/jpg", "image/png" };

    public FileMetadataDtoValidator()
    {
        RuleFor(x => x.Size)
            .NotNull()
            .LessThanOrEqualTo(MaxFileSize)
            .WithMessage("Provided file is bigger than 1MB");

        RuleFor(x => x.FileType)
            .NotNull()
            .Must(x => PermittedExtensions.Contains(x))
            .WithMessage("Only '.jpg' and '.png' are valid extensions");

        RuleFor(x => x.Content)
            .NotNull()
            .WithMessage("File content should not be null");
    }
}
