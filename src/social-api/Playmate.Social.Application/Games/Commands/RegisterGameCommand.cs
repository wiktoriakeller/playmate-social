using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.Dtos;
using Playmate.Social.Application.Games.Responses;

namespace Playmate.Social.Application.Games.Commands;

public class RegisterGameCommand : IRequestWrapper<RegisterGameResponse>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string ServerUrl { get; set; }
    public FileMetadataDto FileMetadata { get; set; }
}
