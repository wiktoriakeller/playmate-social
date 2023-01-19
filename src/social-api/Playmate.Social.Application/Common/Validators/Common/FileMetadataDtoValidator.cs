﻿using FluentValidation;
using Playmate.Social.Application.Common.Dtos;

namespace Playmate.Social.Application.Common.Validators.Common;

public class FileMetadataDtoValidator : AbstractValidator<FileMetadataDto>
{
    private const string UnsuporrtedExtension = "Only '.jpg' and '.png' are valid extensions";
    private const string TooBigFileSize = "Provided file is bigger than 1MB";
    private const string EmptyFileXontent = "File content should not be null";

    private const long MaxFileSize = 1048576;
    private static readonly string[] PermittedExtensions = new string[] { "image/jpeg", "image/jpg", "image/png" };

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
    }
}
