using Playmate.Social.Application.Common;
using Playmate.Social.Application.Users.Responses;

namespace Playmate.Social.Application.Users.Queries;

public class GetUsersByUsernameQuery : IRequestWrapper<GetUsersByUsernameResponse>
{
    public string Username { get; set; }
}
