using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Services;

namespace Playmate.Social.Application.Common.Services;

public class RoomIdProvider : IRoomIdProvider
{
    private readonly IIdentityService _identityService;

    public RoomIdProvider(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Response<string>> GetRoomIdForUsers(Guid firstUserId, Guid secondUserId)
    {
        var sender = await _identityService.GetUserById(firstUserId);

        if (sender is null)
        {
            return ResponseResult.NotFound<string>("First user was not found");
        }

        var receiver = await _identityService.GetUserById(secondUserId);

        if (receiver is null)
        {
            return ResponseResult.NotFound<string>("Second user was not found");
        }

        var firstUserName = sender.Username;
        var secondUserName = receiver.Username;
        var roomId = $"{firstUserName}{secondUserName}";

        if (string.Compare(secondUserName, firstUserName, true) < 0)
        {
            roomId = $"{secondUserName}{firstUserName}";
        }

        return ResponseResult.Ok(roomId);
    }
}
