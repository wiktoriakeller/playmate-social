using Playmate.Social.Application.Common;
using Playmate.Social.Application.GameResults.Responses;

namespace Playmate.Social.Application.GameResults.Commands;

public class AddGameResultCommand : IRequestWrapper<AddGameResultResponse>
{
    public Guid GameId { get; set; }
    public Guid WinnerId { get; set; }
    public Guid LoserId { get; set; }
}
