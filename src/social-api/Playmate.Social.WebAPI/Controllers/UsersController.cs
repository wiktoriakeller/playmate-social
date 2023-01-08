using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Playmate.Social.Application.Common.Dtos;
using Playmate.Social.Application.Friends.Dtos;
using Playmate.Social.Application.Friends.Queries;
using Playmate.Social.Application.Users.Commands;
using Playmate.Social.Application.Users.Queries;
using Playmate.Social.Application.Users.Responses;
using Playmate.Social.WebAPI.ApiRequests.Users;
using Playmate.Social.WebAPI.Hubs;
using Playmate.Social.WebAPI.Hubs.Clients;
using Playmate.Social.WebAPI.Hubs.Responses;

namespace Playmate.Social.WebAPI.Controllers;

[Authorize]
[Route("api/v1/users")]
public class UsersController : BaseApiController
{
    private readonly IHubContext<NotificationsHub, INotificationsClient> _notificationsHub;

    public UsersController(IMediator mediator, IMapper mapper, IHubContext<NotificationsHub, INotificationsClient> notificationsHub) : base(mediator, mapper)
    {
        _notificationsHub = notificationsHub;
    }

    [HttpGet("{username}")]
    public async Task<IActionResult> GetUsersByUsername([FromRoute] string username)
    {
        var query = new GetUsersByUsernameQuery() { Username = username };
        var response = await _mediator.Send(query);
        return GetStatusCode(response);
    }

    [HttpPut("{userId}")]
    public async Task<IActionResult> UpdateUser([FromRoute] string userId, [FromForm] UpdateUserRequest request)
    {
        var command = new UpdateUserCommand
        {
            Username = request.Username,
            UserId = Guid.Parse(userId),
        };

        if (request.Picture is not null)
        {
            var fileMetadata = new FileMetadataDto
            {
                Content = request.Picture?.OpenReadStream(),
                Name = request.Picture?.FileName,
                Size = request.Picture?.Length,
                FileType = request.Picture?.ContentType
            };

            command.FileMetadata = fileMetadata;
        }

        var response = await _mediator.Send(command);

        if (response.Succeeded && response.Data is not null)
        {
            var userFriends = await _mediator.Send(new GetFriendsListQuery { Search = "" });

            if (userFriends.Succeeded && userFriends.Data is not null)
            {
                var friends = userFriends.Data.Friends;
                await NotifyFriends(friends, response.Data, userId);
            }
        }

        return GetStatusCode(response);
    }

    private async Task NotifyFriends(IEnumerable<FriendListItemDto> friends, UpdateUserResponse response, string userId)
    {
        var tasks = new List<Task>();

        foreach (var friend in friends)
        {
            var clientResponse = new UpdateFriendDataResponse
            {
                FriendId = userId,
                ProfilePictureUrl = response.ProfilePictureUrl,
                Username = response.Username
            };

            tasks.Add(_notificationsHub.Clients.User(friend.Id.ToString()).ReceiveFriendDataUpdate(clientResponse));
        }

        await Task.WhenAll(tasks);
    }
}
