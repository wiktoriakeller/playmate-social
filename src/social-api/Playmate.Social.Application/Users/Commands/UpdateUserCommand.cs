using Playmate.Social.Application.Common;
using Playmate.Social.Application.Common.Dtos;
using Playmate.Social.Application.Users.Responses;

namespace Playmate.Social.Application.Users.Commands;

public class UpdateUserCommand : IRequestWrapper<UpdateUserResponse>
{
    public Guid UserId { get; set; }
    public string Username { get; set; }
    public FileMetadataDto? FileMetadata { get; set; }
}
