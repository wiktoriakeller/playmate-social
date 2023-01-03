using Playmate.Social.Application.Common;
using Playmate.Social.Application.Users.Responses;

namespace Playmate.Social.Application.Users.Commands;

public class UpdateUserCommand : IRequestWrapper<UpdateUserResponse>
{
    public Guid UserId { get; init; }
    public string Username { get; init; }
    public Stream? Picture { get; init; }
    public string? PictureName { get; init; }
    public string? PictureType { get; init; }
    public long? PictureSize { get; init; }
}
