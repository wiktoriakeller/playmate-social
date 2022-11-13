using Playmate.Social.Application.Identity.Dtos;

namespace Playmate.Social.Application.Identity.Responses;

public class GetUsersByUsernameResponse
{
    public IEnumerable<UserDto> Users { get; set; }
    public GetUsersByUsernameResponse(IEnumerable<UserDto>? users)
    {
        Users = users ?? new List<UserDto>();
    }
}
