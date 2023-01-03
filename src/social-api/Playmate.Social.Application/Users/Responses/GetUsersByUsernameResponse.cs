using Playmate.Social.Application.Users.Dtos;

namespace Playmate.Social.Application.Users.Responses;

public class GetUsersByUsernameResponse
{
    public IEnumerable<UserDto> Users { get; init; }

    public GetUsersByUsernameResponse(IEnumerable<UserDto>? users)
    {
        Users = users ?? new List<UserDto>();
    }
}
