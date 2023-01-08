namespace Playmate.Social.Application.Common.Dtos;

public class FileMetadataDto
{
    public Stream? Content { get; init; }
    public string? Name { get; init; }
    public string? FileType { get; init; }
    public long? Size { get; init; }
}
