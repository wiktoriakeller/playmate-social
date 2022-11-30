using Playmate.Social.Application.Common.BaseResponse;

namespace Playmate.Social.Application.Common.Contracts.Services;

public interface IRoomIdProvider
{
    Task<Response<string>> GetRoomIdForUsers(Guid firstUserId, Guid secondUserId);
}
