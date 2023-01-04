using Playmate.Social.Application.Common.BaseResponse;
using Playmate.Social.Application.Common.Contracts.Identity;
using Playmate.Social.Application.Common.Contracts.Persistence;
using Playmate.Social.Application.Common.Contracts.Services;

namespace Playmate.Social.Application.Common.Services;

public class RoomIdProvider : IRoomIdProvider
{
    private readonly IUsersRepository _usersRepository;
    private readonly ICurrentUserService _currentUserService;

    public RoomIdProvider(IUsersRepository usersRepository, ICurrentUserService currentUserService)
    {
        _usersRepository = usersRepository;
        _currentUserService = currentUserService;
    }

    public async Task<Response<string>> GetRoomIdByFriendId(Guid friendId)
    {
        var friend = await _usersRepository.FirstOrDefaultAsync(u => u.Id == friendId);

        if (friend is null)
        {
            return ResponseResult.NotFound<string>("Friend with specified ID was not found");
        }

        var currentUserId = _currentUserService.CurrentUser.Id;
        var roomId = $"{currentUserId}{friendId}";

        if (string.Compare(friendId.ToString(), currentUserId.ToString(), true) < 0)
        {
            roomId = $"{friendId}{currentUserId}";
        }

        return ResponseResult.Ok(roomId);
    }
}
