using Playmate.Social.Application.Common;
using Playmate.Social.Application.Identity.Responses;

namespace Playmate.Social.Application.Identity.Queries;

public class GetUsersByUsernameQuery : IRequestWrapper<GetUsersByUsernameResponse>
{
    public string Username { get; set; }
}
