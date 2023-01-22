using FluentValidation;
using Playmate.Social.Application.Common.Dtos;
using System.Text;

namespace Playmate.Social.Application.Common.Validators.Common;

public class FileMetadataDtoValidator : AbstractValidator<FileMetadataDto>
{
    private const string UnsuporrtedExtension = "Only '.jpg' and '.png' are valid extensions";
    private const string TooBigFileSize = "Provided file is bigger than 1MB";
    private const string EmptyFileXontent = "File content should not be null";
    private const long MaxFileSize = 1048576;

    private static readonly string[] PermittedExtensions = new string[] { "image/jpeg", "image/jpg", "image/png" };

    private static readonly Dictionary<string, (int, string)> FileHeaders = new()
    {
        {"image/png", (8, "89504E470D0A1A0A")},
        {"image/jpeg", (2, "FFD8") },
        {"image/jpg", (2, "FFD8") }
    };

    public FileMetadataDtoValidator()
    {
        RuleFor(x => x.Size)
            .NotNull()
            .LessThanOrEqualTo(MaxFileSize)
            .WithMessage(TooBigFileSize);

        RuleFor(x => x.FileType)
            .NotNull()
            .Must(x => PermittedExtensions.Contains(x))
            .WithMessage(UnsuporrtedExtension);

        RuleFor(x => x.Content)
            .NotNull()
            .WithMessage(EmptyFileXontent);

        RuleFor(x => x)
            .Must(ValidateFileHeader)
            .WithMessage(UnsuporrtedExtension);
    }

    private bool ValidateFileHeader(FileMetadataDto file)
    {
        if (file.Content is not null && file.FileType is not null && FileHeaders.ContainsKey(file.FileType))
        {
            var header = new StringBuilder();
            var (size, validatedHeader) = FileHeaders[file.FileType];

            for (int i = 0; i < size; i++)
            {
                var part = file.Content.ReadByte().ToString("X2");
                header.Append(part);
            }

            file.Content.Seek(0, SeekOrigin.Begin);

            if (validatedHeader == header.ToString())
            {
                return true;
            }
        }

        return false;
    }
}
