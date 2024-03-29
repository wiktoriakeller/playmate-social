﻿using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Playmate.Social.Application.Common.Dtos;
using Playmate.Social.Application.Games.Commands;
using Playmate.Social.Application.Games.Queries;
using Playmate.Social.WebAPI.ApiRequests.Games;

namespace Playmate.Social.WebAPI.Controllers;

[Authorize]
[Route("api/v1/games")]
public class GamesController : BaseApiController
{
    public GamesController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpGet]
    public async Task<IActionResult> GetGames()
    {
        var response = await _mediator.Send(new GetGamesQuery());
        return GetStatusCode(response);
    }

    [HttpPost]
    public async Task<IActionResult> RegisterGame([FromForm] RegisterGameRequest request)
    {
        var command = _mapper.Map<RegisterGameCommand>(request);

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
        return GetStatusCode(response);
    }
}
